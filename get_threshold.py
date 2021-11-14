'''
Created on 2021/11/06

@author: xiaob
'''

from yuxi_reading import Read_signal
import serial
import time

readClass = Read_signal()
myport = readClass.select_port(9600)
selected = input("Which input?(A0/A1)：")
number = None
if(selected == "A0"):
    number = 1
    readClass.get_thres(myport, 200, number)
elif(selected == "A1"):
    number = 3
    readClass.get_thres(myport, 200, number)
else:
    print("正しい値を入力してください")