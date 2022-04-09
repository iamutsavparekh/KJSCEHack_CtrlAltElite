import cv2
import numpy as np
def sharpen_btn_clicked(img):
    kernel = np.ones((5,5),np.float32)/25
    dst = cv2.filter2D(img,-1,kernel)
    cv2.imwrite('Smooth.jpg',dst)
