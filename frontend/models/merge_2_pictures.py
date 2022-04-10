def merge(img1, img2 , choice):
    
    # horizontal 2 stack , vertical 2 stack 
    # if zip file possible then : grid of 4 , grid of 9
    image1=cv2.imread(img1)
    image2=cv2.imread(img2)
    image1=cv2.resize(image1,(200,200))
    image2=cv2.resize(image2,(200,200))
    if choice=="Horizontal":
        H=np.hstack([image1,image2])
        H_img = Image.fromarray(H)
        H_img.save("merged_H.jpg")
        
    elif choice=="Vertical":
        V=np.vstack([image1,image2])
        V_img = Image.fromarray(V)
        V_img.save("merged_V.jpg")
        
if __name__ == '__main__':
    
    merge("img1.jpg", "img2.jpg" , "Horizontal")
