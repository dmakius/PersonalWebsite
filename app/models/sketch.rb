class Sketch < ActiveRecord::Base
	 # This method associates the attribute ":avatar" with a file attachment
  has_attached_file :sketch_image, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>',
    large: '600x600>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :sketch_image, :content_type => /\Aimage\/.*\Z/
end
