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
	
	form do |f|
		f.inputs "Meme Details" do
	    	f.input :avatar, :required => false, :as => :file
	      # Will preview the image when the object is edited
	    end
	    f.actions
	end

	show do |ad|
      attributes_table do
        row :avatar do
         
        end
        # Will display the image on show object page
      end
    end

end