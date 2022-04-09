import cv2
import numpy as np
def sharpen_btn_clicked(original_img):
    global sharpened
    img=np.copy(original_img)
    kernel=np.array([-1,-1,-1,
                    -1,9,-1,
                    -1,-1,-1 ])
    sharpened= cv2.filter2D(img,-1,kernel)
    
    cv2.imwrite('Sharpened.jpg',sharpened)