class PicturesController < ApplicationController
  def sketches
  end

  def pics
    @picture = Picture.all
  end
end
