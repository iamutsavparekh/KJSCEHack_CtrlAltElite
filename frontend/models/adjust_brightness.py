from PIL import Image, ImageEnhance

def brightness(filename,factor):
  
  #read the image
  im = Image.open(filename)

  #image brightness enhancer
  enhancer = ImageEnhance.Brightness(im)

  #factor = 1 #gives original image
  im_output = enhancer.enhance(factor)
  im_output.save('original-image.png')

  #factor = 0.5 #darkens the image
  im_output = enhancer.enhance(factor)
  im_output.save('darkened-image.png')

  #factor = 1.5 #brightens the image
  im_output = enhancer.enhance(factor)
  im_output.save("brightened_"+filename)
  
""" if __name__ == '__main__':
  brightness("jpeg_trial.jpg",0.5)
 """