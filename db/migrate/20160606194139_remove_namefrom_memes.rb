class RemoveNamefromMemes < ActiveRecord::Migration
  def change
  	remove_column :meme, :name
  end
end
