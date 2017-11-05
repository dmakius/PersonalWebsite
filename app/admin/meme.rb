ActiveAdmin.register Meme do
	controller do
	    def permitted_params
	     	 params.permit meme: [:avatar, :category]
	       # params.permit!
	    end
	end

	index do
		column :id
		column "Images" do |meme|
   			image_tag(meme.avatar(:thumb))
  		end
  		column :category
		column :created_at
 		actions
	end
	
	#for the Edit Page
	form do |f|
		f.inputs "Meme Details" do
	    	f.input :avatar, :required => false, :as => :file
	    	f.input :category
	      # Will preview the image when the object is edited
	    end
	    f.actions
	end

	##for the view page
	show do |ad|
      attributes_table do
        row "Picture" do |meme|
   			image_tag(meme.avatar(:medium))
        end
        row :category
        # Will display the image on show object page
      end
    end

end
