import cv2
import numpy as np
arr=[]
def mouse(event,x,y,flags,param):
    global arr
    if event == cv2.EVENT_LBUTTONDOWN:
        arr.append(x)
        arr.append(y)
def manual_crop_clicked(original_img):
    global cropped
    while True:
        img=np.copy(original_img)
        cv2.namedWindow("Img")
        cv2.setMouseCallback("Img",mouse)
        cv2.imshow("Img",img)
        if len(arr)==4:
            cropped=img[arr[1]:arr[3],arr[0]:arr[2]]
            cv2.imshow("Cropped",cropped)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cv2.imwrite('Cropped.jpg',cropped)