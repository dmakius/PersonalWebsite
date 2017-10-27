class SketchesController < ApplicationController
	def index
		@sketch = Sketch.all
	end

	def new
		puts "Making a new SKEtCH"
		@sketch = Sketch.new
	end

	def create
		@sketch = Sketch.new(sketch_params)
		respond_to do |format|
			puts "starting the save"
      	if @sketch.save
      		puts "saving image to aws"
	       format.html { redirect_to @sketch, notice: 'Sketch was successfully Uploaded.' }
	       format.json { render :show, status: :created, location: @sketch }
	    else
	       format.html { render :new }
	       format.json { render json: @sketch.errors, status: :unprocessable_entity }
	    end
   	 end
	end

	def show
		@sketch = Sketch.find(params[:id])
	end
	 
	def destroy
		@sketch = Sketch.find(params[:id])
		puts "destroying sketch"
	    @sketch.destroy
	    respond_to do |format|
	      format.html { redirect_to sketches_url, notice: 'sketch was successfully destroyed.' }
	      format.json { head :no_content }
	    end
  	end


  private

    def sketch_params
      params.require(:sketch).permit(:sketch_image, :title, :about)
    end
end
end
