class MemesController < InheritedResources::Base
	before_filter :cors_preflight_check
 	after_filter :cors_set_access_control_headers

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

  	def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end


  def cors_preflight_check
     if request.method == :options
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Allow-Headers'] = '*'
    headers['Access-Control-Max-Age'] = '1728000'
    render :text => '', :content_type => 'text/plain'
  end
  end

  private

    def meme_params
      params.require(:meme).permit(:avatar)
    end
end

