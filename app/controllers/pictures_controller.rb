class PicturesController < ApplicationController
  def sketches
  	 @picture = Picture.all
  end

  def pics
    @picture = Picture.all
  end
end
