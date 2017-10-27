ActiveAdmin.register Sketch do
	 actions :all
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

	controller do
	    def permitted_params
	      params.permit sketch: [:id, :sketch_image, :title, :about]
	    end

	    def new
	    	@sketch = Sketch.new
	    	puts "CREATING NEW"
	    end
	     
	    def edit
	    	@sketch = Sketch.find(params[:id]) 
	    	puts "EDITING SKETCH"
	    end
	    def destroy
	    	@sketch = Sketch.find(params[:id]) 
	    	super
	    end
	end
	
	#for the index page
	index do
		column :id
		column "Sketches" do |sketch|
   			image_tag(sketch.sketch_image(:thumb))
  		end
  		column :title
        column :about
		column :created_at
 		actions
	end 

	#for the Edit Page
	form do |f|
		f.inputs "Sketch Details" do
			f.input :sketch_image, :required => false, :as => :file
			f.input :title
			f.input :about
	      # Will preview the image when the object is edited
	    end
	    f.actions
	end
	
	##for the view page
	show do
    	attributes_table do
	      row :id
	      row :title
	      row :about
	      row :created_at
	      row "Sketch Image" do |sketch|
	        image_tag(sketch.sketch_image(:large))
	     	end
    	end
  	end
	
	
end
