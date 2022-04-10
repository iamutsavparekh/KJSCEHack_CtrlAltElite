import cv2
import numpy as np
def blur_btn_clicked(original_img):
    img=np.copy(original_img)
    gaussianblur=cv2.GaussianBlur(img,(25,25),2)
    cv2.imwrite('Blur.jpg',gaussianblur)