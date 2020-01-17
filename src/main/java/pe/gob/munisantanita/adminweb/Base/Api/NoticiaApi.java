package pe.gob.munisantanita.adminweb.Base.Api;



//@RestController
//@RequestMapping("/api")
public class NoticiaApi {
	
	/*
	@PostMapping(value="/**", produces = "application/json")
	@ResponseBody
	public String post(@RequestBody(required=false) String json, HttpServletRequest request, HttpServletResponse res){		

		String ruta = request.getRequestURI().substring(request.getContextPath().length() + "/api".length()) ; // -5 del string "/api/"
		String Uri = ruta + ( request.getQueryString() != null ? "?"+request.getQueryString() : "" );

         try {
        	 
    		 HttpResponse httpResponse = F.post(Helper.apiNoticia(Uri), json);
             res.setStatus(httpResponse.getStatusLine().getStatusCode());
             
             return EntityUtils.toString( httpResponse.getEntity());

		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 return null;

	}
	*/
}
