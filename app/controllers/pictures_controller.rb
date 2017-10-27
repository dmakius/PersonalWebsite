class PicturesController < ApplicationController
  def sketches
  	 @picture = Picture.all
  end

  def pics
    @picture = Sketch.all
  end 
end
