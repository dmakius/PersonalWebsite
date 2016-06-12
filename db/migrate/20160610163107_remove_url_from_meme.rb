class RemoveUrlFromMeme < ActiveRecord::Migration
  def change
    remove_column :memes, :url, :text
  end
end
