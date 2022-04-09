import cv2
def cartoon(img):
    cartoon_image = cv2.stylization(img, sigma_s=160, sigma_r=0.25)  
    cv2.imwrite('Cartoon.jpg',cartoon_image)