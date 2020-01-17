package pe.gob.munisantanita.adminweb.admin.usuarios.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.munisantanita.adminweb.admin.usuarios.Repository.RolesRepository;


@Service
public class RolesServiceImpl implements RolesService{

	@Autowired
	RolesRepository usuarioRepository;
	
	
	@Override
	public ArrayList<?> getAvatares() {
		return usuarioRepository.getAvatares();
	}


	@Override
	public Object findRol(long id) {
		return usuarioRepository.findRol(id);
	}

}
