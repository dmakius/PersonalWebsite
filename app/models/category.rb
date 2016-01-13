class Category < ActiveRecord::Base
  belongs_to :posts
  has_many :posts
end
