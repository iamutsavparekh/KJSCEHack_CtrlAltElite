import cv2
import numpy as np
def pencil_sketch(img):
    pencil_img_gray,pencil_img=cv2.pencilSketch(img, sigma_s=65, sigma_r=0.1, shade_factor=0.03)
    pencil=cv2.cvtColor(pencil_img_gray,cv2.COLOR_GRAY2BGR)
    roi1 = np.array([[(0,0), (224,168),(276,0),(640,0),(640,480),(0,480) ]], dtype=np.int32)
    cv2.fillPoly(pencil, roi1, (0,0,0))
    cv2.imwrite('Pencil.jpg',pencil)  