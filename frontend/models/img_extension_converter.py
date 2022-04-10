# !pip install opencv-python
# !pip install aspose.words

# importing required libraries
import aspose.words as aw
import warnings
warnings.filterwarnings('ignore')


def image_extension_converter(input_image,output_format):
    
    doc = aw.Document()
    builder = aw.DocumentBuilder(doc)
    shape = builder.insert_image(input_image)
    shape.image_data.save(input_image.split('.')[-2]+"."+output_format)
    
    
if __name__ == '__main__':
    
    image_extension_converter("png_trial.png","jpg")



