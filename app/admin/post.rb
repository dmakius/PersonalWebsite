ActiveAdmin.register Post do
  menu :label => "Blog Posts"
  index do
      column :title
      column :category
      column :created_at
      actions
  end

  controller do
      def permitted_params
        params.permit!
      end
    end

  form do |f|
    f.inputs do
        f.input :title
        f.input :category
        f.input :body
        f.submit :style => "margin-left:15px;"
    end
  end

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


end
