# f = open("globalData.txt", "r")
from random import random

f2 = open("newGlobalData.txt", "w")
inArray = []
outArray = []
aline = ""
dSize = 0.90

with open('globalData.txt') as f:
    test = f.read().split(",")

i=0
while(i<len(test)-1):
    x = float(test[i])
    y = float(test[i+1])
    magnitude = float(test[i+2])
    for j in [-4, -3, -2, -1, 1, 2, 3, 4]:
        outArray.append(x)
        outArray.append(y+j)
        if(j!= 0):
            outArray.append(magnitude/abs(j)*dSize*random())
        else:
            outArray.append(magnitude)
    for j in [-4, -3, -2, -1, 1, 2, 3, 4]:
        outArray.append(x+j)
        outArray.append(y)
        if(j!= 0):
            outArray.append(magnitude/abs(j)*dSize*random())
        else:
            outArray.append(magnitude)
    for j in [-1, 1]:
        outArray.append(x+j)
        outArray.append(y+3)
        outArray.append(magnitude/3/abs(j)*dSize*random())
        outArray.append(x+j)
        outArray.append(y-3)
        outArray.append(magnitude/3/abs(j)*dSize*random())
    for j in [-2, -1, 1, 2]:
        outArray.append(x+j)
        outArray.append(y+2)
        outArray.append(magnitude/3/abs(j)*dSize*random())
        outArray.append(x+j)
        outArray.append(y-2)
        outArray.append(magnitude/3/abs(j)*dSize*random())
    for j in [-3, -2, -1, 1, 2, 3]:
        outArray.append(x+j)
        outArray.append(y+1)
        outArray.append(magnitude/3/abs(j)*dSize*random())
        outArray.append(x+j)
        outArray.append(y-1)
        outArray.append(magnitude/3/abs(j)*dSize*random())
    i = i+3

print(outArray)

with open("rank2.json", "w") as f2:
    f2.write(str(outArray))
f2.close()
# print(mylist[1])
