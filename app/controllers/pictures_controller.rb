class PicturesController < ApplicationController
  def index
  	   @picture = Sketch.all
  end
end
