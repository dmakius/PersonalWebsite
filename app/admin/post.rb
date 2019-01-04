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
      f.input :body, :as => :ckeditor
    end
    f.actions
  end
end
