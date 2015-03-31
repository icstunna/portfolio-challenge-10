get '/' do

  erb :index

end

get '/me' do
  erb :callback, :layout => false
end
