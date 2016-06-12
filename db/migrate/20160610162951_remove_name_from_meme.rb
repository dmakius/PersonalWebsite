class RemoveNameFromMeme < ActiveRecord::Migration
  def change
    remove_column :memes, :name, :string
  end
end
