package pe.gob.munisantanita.adminweb.Base.Api;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.HttpClientParams;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.munisantanita.adminweb.Base.Utils.AES;
import pe.gob.munisantanita.adminweb.Base.Utils.Constant;
import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;


@RestController
@RequestMapping("/api")
public class ServidorApi {

	
	@PostMapping(value="/**", produces = "application/json")
	@ResponseBody
	public String post(@RequestBody(required=false) String json, HttpServletRequest request, HttpServletResponse res){		

		String ruta = request.getRequestURI().substring(request.getContextPath().length() + "/api".length()) ; // -5 del string "/api/"
		String Uri = ruta + ( request.getQueryString() != null ? "?"+request.getQueryString() : "" );
		
		
		String[] p = ruta.replaceFirst("^/", "").split("/");
  		System.out.println(Helper.apiGlobal(p[0], Uri) + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAapiGlobal:" + p[0]);  //p[0]

         try {
        	 
    		 HttpResponse httpResponse = F.post(Helper.apiGlobal(p[0], Uri), json); //Helper.apiServer(Uri) 
             res.setStatus(httpResponse.getStatusLine().getStatusCode());
    		 String c =  EntityUtils.toString( httpResponse.getEntity());
    	  		System.out.println(Helper.apiGlobal(p[0], Uri) + "AAAAAAYYYYYYYYYYYYYYYYYYYYYYYYAConstant.API_REST.get:" + Constant.API_REST.get(p[0]));  //p[0]

             return c;
             
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 return null;
	}
	
	
	
	

		@GetMapping(value="/**", produces = "application/json")
		@ResponseBody
		public String get(@RequestBody(required=false) String json, HttpServletRequest request, HttpServletResponse res){		

			String ruta = request.getRequestURI().substring(request.getContextPath().length() + "/api".length()) ; // -5 del string "/api/"
			String Uri = ruta+"?"+request.getQueryString();
			String[] p = ruta.replaceFirst("^/", "").split("/");

			try {
				CloseableHttpClient httpClient = HttpClientBuilder.create().build();
		        HttpResponse httpResponse = null;

		        HttpGet httpGet = new HttpGet(Helper.apiGlobal(p[0], Uri)); //Helper.apiServer(Uri)

		        httpGet.addHeader("content-type", "application/json");
	            httpGet.addHeader("token-CSRF", AES.encrypt("default")  );

	            httpResponse = httpClient.execute(httpGet);
	            
	            int code = httpResponse.getStatusLine().getStatusCode();

	            String response = EntityUtils.toString( httpResponse.getEntity());
	            httpClient.close();
	            res.setStatus(code); 

	            return response;
	 
			} catch (Exception ex) {
			    // handle exception here
			} finally {
				 
			}
			
			return null;
		}
	
	
		@PutMapping(value="/**", produces = "application/json")
		@ResponseBody
		public String put(@RequestBody(required=false) String json, HttpServletRequest request, HttpServletResponse res){		

			String ruta = request.getRequestURI().substring(request.getContextPath().length() + "/api".length()) ; // -5 del string "/api/"
			String Uri = ruta + ( request.getQueryString() != null ? "?"+request.getQueryString() : "" );
			String[] p = ruta.replaceFirst("^/", "").split("/");

	        try {
	        	 
	    		 HttpResponse httpResponse = F.put(Helper.apiGlobal(p[0], Uri), json); //Helper.apiServer(Uri)
	             res.setStatus(httpResponse.getStatusLine().getStatusCode());
	             String r = EntityUtils.toString( httpResponse.getEntity());

				
	             return r;
	             
			} catch (ParseException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 
			 return null;
			
		}
		
		
		
		
		@DeleteMapping(value="/**", produces = "application/json")
		@ResponseBody
		public String delete(HttpServletRequest request, HttpServletResponse res){		

			String ruta = request.getRequestURI().substring(request.getContextPath().length() + "/api".length()) ; // -5 del string "/api/"
			String Uri = ruta + ( request.getQueryString() != null ? "?"+request.getQueryString() : "" );
			String[] p = ruta.replaceFirst("^/", "").split("/");

	        try {
	        	 
	    		 HttpResponse httpResponse = F.delete(Helper.apiGlobal(p[0], Uri)); //Helper.apiServer(Uri)
	             res.setStatus(httpResponse.getStatusLine().getStatusCode());
	             String r = EntityUtils.toString( httpResponse.getEntity());
	             
	             return r;
	             
			} catch (ParseException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 
			 return null;
			
		}
}
