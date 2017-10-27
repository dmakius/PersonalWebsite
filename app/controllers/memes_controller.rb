class MemesController < InheritedResources::Base

	def index
		@meme = Meme.all
	end
	
	def all
		@meme = Meme.all
	end

	def new
		@meme = Meme.new
	end

	def create
		@meme = Meme.new(meme_params)
		respond_to do |format|
      	if @meme.save
	       format.html { redirect_to @meme, notice: 'Picture was successfully Uploaded.' }
	       format.json { render :show, status: :created, location: @meme }
	    else
	       format.html { render :new }
	       format.json { render json: @meme.errors, status: :unprocessable_entity }
	    end
   	 end
	end

	def show
		@meme = Meme.find(params[:id])
	end
	 
	def destroy
		@meme = Meme.find(params[:id]) 
	    @meme.destroy
	    respond_to do |format|
	      format.html { redirect_to memes_url, notice: 'Picture was successfully destroyed.' }
	      format.json { head :no_content }
	    end
  	end


  private

    def meme_params
      params.require(:meme).permit(:avatar)
    end
end

