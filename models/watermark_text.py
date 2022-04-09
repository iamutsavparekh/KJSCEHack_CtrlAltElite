from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
def watermark_text(input_image_path,
                   output_image_path,
                   text, pos):
    photo = Image.open(input_image_path)
    # make the image editable
    drawing = ImageDraw.Draw(photo)
    black = (3, 8, 12)
    drawing.text(pos, text, fill=black)
    photo.save(output_image_path)
if __name__ == '__main__':
    img = 'jpeg_trial.jpg'
    watermark_text(img, 'watermarked.jpg',
                   text='@scriptfully_yours',
                   pos=(0, 0))
