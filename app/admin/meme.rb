ActiveAdmin.register Meme do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end
	controller do
	    def permitted_params
	      params.permit meme: [:avatar]
	    end
	end

	index do 
		column :id
		column "Images" do |meme|
   			image_tag(meme.avatar(:thumb))
  		end
		column :created_at
 		actions
	end
	#for the Edit Page
	form do |f|
		f.inputs "Meme Details" do
	    	f.input :avatar, :required => false, :as => :file

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
        # Will display the image on show object page
      end
    end

end