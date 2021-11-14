'''
Created on 2021/10/17

@author: xiaob
'''

#インポート
import serial
from serial.tools import list_ports
import random
import time
"""
from threading import Thread
from functools import singledispatch
"""

class Read_signal:

    #ポート選択
    def select_port(self,rate):
        ser = serial.Serial()
        ser.baudrate = rate #ビット毎秒
        ser.timeout = 1 #タイムアウト時間(s)
        
        ports = list_ports.comports()
        
        devices = [info.device for info in ports]
        
        if len(devices) == 0:
            #デバイス発見なし
            print("デバイスは見つかりませんでした。")
            return None
        elif len(devices) == 1:
            print("only found %s" % devices[0])
            ser.port = devices[0]
        else:
            #複数の場合
            for i in range(len(devices)):
                print("input %3d: open %s" % (i, devices[i]))
            print("番号を入力してください >> ", end = "")
            num = int(input())
            ser.port = devices[num]
            
        try:
            ser.open()
            print("接続に成功しました。")
            ser.close()
            return ser
        except:
            print("接続でエラーが起きました。")
            return None
        
    def open_port(self,port):
        if port is None:
            print("プロセスはスキップされました。")
        else:
            #ポートを開ける
            port.open()
            
            while port.is_open:
                #データ読み取り
                data = port.readline()
                ladata = 0
                try:
                    ladata = int(data.decode())
                    print(ladata)
                except:
                    print(data.decode())
                #print(data)
                #time.sleep(0.004)
                
            port.close()
            
    def just_read(self,port):
        port.open()
        while port.is_open:
            data = port.readline()
            print(data)
            
        port.close()
        
    def just_decode(self,port):
        port.open()
        while port.is_open:
            data = port.readline()
            print(data.decode())
            
        port.close()
        
    def split_sig(self,port,splet):
        port.open()
        while port.is_open:
            data = port.readline()
            print(data.decode().split(splet))
        port.close()
    
    def split_sig_n(self,port):
        port.open()
        while port.is_open:
            data = port.readline()
            print(data.decode().split())
        port.close()
            
    def button_judgement(self,port,but0,but1,thres0,thres1):
        if port is None:
            print("プロセスはスキップされました。")
        else:
            port.open()
            while port.is_open:
                #データ読み取り
                data = port.readline().decode().split()
                print(data)
                try:
                    but0sig = int(data[1])
                    but1sig = int(data[3])
                except:
                    but0sig = 0
                    but1sig = 0
                if(but0sig >= thres0 and but1sig >= thres1):
                    port.close()
                    if(random.random() < 0.5):
                        return but0
                    else:
                        return but1
                elif(but0sig >= thres0):
                    port.close()
                    return but0
                elif(but1sig >= thres1):
                    port.close()
                    return but1
            port.close()
            
    def readfor(self,port,times,listnum):
        inlist = []
        for i in range(times):
            data = port.readline().decode().split()
            butsig = 0
            try:
                butsig = int(data[listnum])
            except:
                butsig = 0
            inlist.append(butsig)
            print(butsig)
        print("")
        return max(inlist)
    
    def get_thres(self,port,times,listnum):
        port.open()
        print("")
        print("Relax")
        time.sleep(1)
        low = self.readfor(port, times, listnum)
        print("")
        time.sleep(1)
        print("GO!")
        print("")
        time.sleep(1)
        high = self.readfor(port, times, listnum)
        print("Low")
        print(low)
        print("High")
        print(high)
        print("")
        thres = (low + high) * 0.4
        print("しきい値")
        print(thres)
        port.close()
        return thres
