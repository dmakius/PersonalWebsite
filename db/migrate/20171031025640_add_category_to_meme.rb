class AddCategoryToMeme < ActiveRecord::Migration
  def change
  	add_column :memes, :category, :string
  end
end
