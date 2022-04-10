from PIL import Image
from PIL import ImageEnhance
def adjust_contrast(input_image, output_image, factor):
    image = Image.open(input_image)
    enhancer_object = ImageEnhance.Contrast(image)
    out = enhancer_object.enhance(factor)
    out.save(output_image)
if __name__ == '__main__':
    adjust_contrast('jpeg_trial.jpg',
                    'contrast.jpg',
                    1.7)
