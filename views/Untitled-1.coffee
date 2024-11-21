we want ki '/' page par ek decent sa page dikhe jaha par likha ho sign in on click to sign in -->  '/login' page render.
 if aapke pass account nhii haii toh ushi login page ke neeche likha haii create an account '/register' par jo kii ek or form dikhayega jaha par account aap register kar skte ho.
 
 after filling the form when you click the submit button toh aapka jo form haii bo submit ho jayega or '/register' as a post kyaa waha par userModel ke through .create kar paaoge 

 Create krte time aapko password ko encrypt bhii krna hoga or if password is encrypt then aapko ek token bana ke cookie pe set krna hoga. 
 and then redirect it to the '/profile' page par
 ye profile ushi kii hona chahiye jisne login kiya haii ya account banaya haii 

 kyaa nhii hona chahiye kii mene account banaya or profile page generic haii sabke liye same page khul rha haii 
 userModel.findOne on the basis of {email} you get the user , you get the data and now you can render a page called profile.

 while rendering the page you can send the data why are . render in the page profile.ejs you can actually render the route with the dynamic rendering <= %=> 

 that brings us two protected routes toh protected routes ka system ye hai kii you don't want kii if bo url par jaake
 /profile page likh de toh seedha profile page khul jaye  we want if bo upar '/profile' likh ke enter maare or if bo loggedIn nhii haii toh bo seedha '/' route page par phuch jaye 

 In case if you don't know you will create a function called protected route () which except (req,res,next ) inside that we legend check for a token if (!req.cookies.token) is not there then you res.redirect('/') route .

 and if its there toh hum check krenge sahi haii ya nhii 
 jwt.verify with the token on the basis of that secret key jisse token bana tha.

 Even you receive a result true/false 
 if(true) allow return next basically that allow to open the page.
 if (!true) res.redirect('/').
 
 So, that's the protected route now you put this function to any route forex. '/profile par jayega toh phele ushe protected route se nikalna padega.