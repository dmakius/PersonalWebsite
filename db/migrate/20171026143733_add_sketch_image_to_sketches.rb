class AddSketchImageToSketches < ActiveRecord::Migration
  def change
  	add_attachment :sketches, :sketch_image
  end
end
