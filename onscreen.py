'''
Created on 2021/10/25

@author: xiaob
'''

#インポート
from yuxi_reading import Read_signal
import eel

thresA0 = 100 #A0のしきい値
thresA1 = 220 #A1のしきい値

readClass = Read_signal()
myport = readClass.select_port(9600)

@eel.expose
def quizbutton(per1, per2):
    #readclass = Read_signal()
    #myport = readclass.select_port(9600)
    answerer = readClass.button_judgement(myport, per1, per2, thresA0, thresA1)
    return answerer

eel.init("")
eel.start("score.html", port=0)