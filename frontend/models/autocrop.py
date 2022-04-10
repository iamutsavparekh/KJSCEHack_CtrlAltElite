import cv2
import numpy as np
transformed=np.zeros((),np.uint8)
def autocrop_btn_clicked(original_img):
    global transformed
    img= np.copy(original_img)
    ratio = img.shape[1]/img.shape[0]
    height = int(1100/ratio)
    TransformedImage = cv2.resize(img,(1100,height))

    img_gray = cv2.cvtColor(TransformedImage,cv2.COLOR_BGR2GRAY)
    adaptive = cv2.adaptiveThreshold(img_gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,55,3)
    canny = cv2.Canny(adaptive,150,250)

    contours, hierarchy = cv2.findContours(canny,cv2.RETR_TREE,cv2.CHAIN_APPROX_NONE)
    area = [cv2.contourArea(x) for x in contours]
    max_index = np.argmax(area)
    max_contour = contours[max_index]
    perimeter = cv2.arcLength(max_contour,True)
    region = cv2.approxPolyDP(max_contour,0.01*perimeter,True)


    if len(region) == 4:

        cv2.drawContours(TransformedImage,[region],-1,(255,0,0),10)
        lst = [region[0],region[3],region[1],region[2]]
        pt1 = np.array(lst,np.float32)
        pt2 = np.array([(0, 0), (600, 0), (0, 600), (600, 600)],np.float32)

        perspective = cv2.getPerspectiveTransform(pt1,pt2)
        transformed = cv2.warpPerspective(TransformedImage, perspective, (600,600))    

        cv2.imwrite('Transformed.jpg',transformed)