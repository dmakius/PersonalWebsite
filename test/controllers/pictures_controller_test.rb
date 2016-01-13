require 'test_helper'

class PicturesControllerTest < ActionController::TestCase
  test "should get sketches" do
    get :sketches
    assert_response :success
  end

  test "should get pics" do
    get :pics
    assert_response :success
  end

end
