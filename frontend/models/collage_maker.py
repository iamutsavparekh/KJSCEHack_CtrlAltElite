import zipfile
from glob import glob

def collage_maker(zip_file,choice):

    #zip_folder = 'zipp.zip'

    with zipfile.ZipFile(zip_folder) as zf:
        zf.extractall()


    path = zip_file[:-4]+"/*.jpg"
    all_files = glob(path)

    images_list_1=[]
    images_list_2=[]

    for path in all_files:
        img=cv2.imread(path)
        img=cv2.resize(img,(200,200))
        if choice=="Horizontal_stack" or choice=="Vertical_stack":
            images_list_1.append(img)
        elif choice=="Grid_2*2":
            if len(images_list_1)<2:
                images_list_1.append(img)
            else:
                images_list_2.append(img)
        elif choice=="Grid_3*3":
            if len(images_list_1)<3:
                images_list_1.append(img)
            else:
                images_list_2.append(img)


    if choice=="Horizontal_stack":
        H=np.hstack(images_list_1)
        H_img = Image.fromarray(H)
        H_img.save("merged_H.jpg")
    elif choice=="Vertical_stack":
        V=np.vstack(images_list_1)
        V_img = Image.fromarray(V)
        V_img.save("merged_V.jpg")
    else:
        Horizontal1=np.hstack(images_list_1)
        Horizontal2=np.hstack(images_list_2)
        Vertical_attachment=np.vstack([Horizontal1,Horizontal2])
        C_img = Image.fromarray(Vertical_attachment)
        C_img.save("C.jpg")

if __name__ == '__main__':
    
    collage_maker("zipp.zip" , "Grid_2*2")
