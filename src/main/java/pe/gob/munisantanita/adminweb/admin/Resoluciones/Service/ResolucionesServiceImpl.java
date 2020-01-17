package pe.gob.munisantanita.adminweb.admin.Resoluciones.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Resoluciones;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Repository.ResolucionesRepository;

@Service
public class ResolucionesServiceImpl implements ResolucionesService {
	
	@Autowired
	ResolucionesRepository resoluciones;

	
	@Override
	public ArrayList<?> tipo() {
		// TODO Auto-generated method stub
		return resoluciones.tipo();
	}
	
	@Override
	public ArrayList<?> area() {
		// TODO Auto-generated method stub
		return resoluciones.area();
	}
	
	@Override
	public Object buscarResolucion(long id) {
		
		return resoluciones.buscarResolucion(id);
	}
}
