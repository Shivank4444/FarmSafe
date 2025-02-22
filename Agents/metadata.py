import exifread

def get_all_image_metadata(image_path):
    """Extracts all available EXIF metadata from an image file using exifread.

    Args:
        image_path (str): The path to the image file.

    Returns:
        dict: A dictionary containing all extracted metadata or None if an error occurs.
    """

    with open(image_path, 'rb') as image_file:
        try:
            tags = exifread.process_file(image_file)
            return tags
        except (FileNotFoundError, IOError) as e:
            print(f"Error opening image: {e}")
            return None

# Example usage
image_path = "E:\Hackofiesta\hackofiesta\Agents\IMG_20230125_115415.jpg"
all_metadata = get_all_image_metadata(image_path)

if all_metadata:
    print("Image Metadata:")
    for tag, value in all_metadata.items():
        try:
            decoded_value = value.decode()  # Attempt to decode byte strings
        except AttributeError:
            decoded_value = value  # Keep as is if not a byte string
        print(f"\t- {tag}: {decoded_value}")
else:
    print("Error: Could not extract metadata from the image.")
