import React, { useState } from 'react';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    kvkkApproved: false
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Ad doğrulama
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad alanı zorunludur';
    }
    
    // Soyad doğrulama
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad alanı zorunludur';
    }
    
    // Telefon numarası doğrulama (Türkiye için)
    const phoneRegex = /^(05)[0-9][0-9][0-9]{7}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Telefon numarası alanı zorunludur';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Geçerli bir telefon numarası girin (05xx xxx xx xx)';
    }
    
    // KVKK onayı doğrulama
    if (!formData.kvkkApproved) {
      newErrors.kvkkApproved = 'Devam etmek için KVKK metnini onaylamanız gerekmektedir';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">Ad</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="form-control"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName">Soyad</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-control"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phoneNumber">Telefon Numarası</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="form-control"
          placeholder="05xx xxx xx xx"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
      </div>
      
      <div className="form-group">
        <div className="kvkk-text">
          <h4>Kişisel Verilerin Korunması</h4>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, bu form aracılığıyla paylaştığınız kişisel verileriniz,
            ReactXchem etkinliği çekilişinin düzenlenmesi ve yürütülmesi amacıyla sınırlı olarak işlenmektedir.
            Kişisel verileriniz, yasal zorunluluklar haricinde üçüncü kişilerle paylaşılmayacaktır.
          </p>
          <p>
            Etkinlik sonunda çekiliş amacıyla topladığımız kişisel verileriniz, yasal zorunluluklar dışında 1 yıl içerisinde silinecektir.
            Kişisel verilerinizin işlenmesi ile ilgili detaylı bilgi için etkinlik yetkililerine başvurabilirsiniz.
          </p>
        </div>
        
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="kvkkApproved"
            name="kvkkApproved"
            checked={formData.kvkkApproved}
            onChange={handleChange}
          />
          <label htmlFor="kvkkApproved">
            Kişisel verilerimin, yukarıda belirtilen amaçlar doğrultusunda işlenmesini kabul ediyorum.
          </label>
        </div>
        {errors.kvkkApproved && <div className="error">{errors.kvkkApproved}</div>}
      </div>
      
      <button type="submit" className="btn btn-primary">
        Çekilişe Katıl
      </button>
    </form>
  );
};

export default RegistrationForm;
