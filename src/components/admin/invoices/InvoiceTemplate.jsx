import React from 'react';
import PropTypes from 'prop-types';
import { Building2, User, Calendar, Bed } from 'lucide-react';

const InvoiceTemplate = React.forwardRef(({ data }, ref) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    const value = typeof amount === 'object' && amount.$numberDecimal 
      ? parseFloat(amount.$numberDecimal)
      : parseFloat(amount) || 0;
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(to right, #2563eb, #1d4ed8)', 
        color: 'white', 
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '16rem',
          height: '16rem',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          transform: 'translate(20%, -20%)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          opacity: 0.1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.5rem'
          }}>
            {[...Array(36)].map((_, i) => (
              <div key={i} style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'white',
                borderRadius: '50%'
              }}></div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>FACTURA</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <p style={{ fontSize: '1.125rem' }}>FECHA: {formatDate(data.Date)}</p>
            <p style={{ fontSize: '1.125rem' }}>NÚMERO: {data._id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Cliente y Empresa */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        padding: '2rem',
        backgroundColor: '#f9fafb'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <User style={{ marginRight: '0.5rem' }} size={20} />
            CLIENTE:
          </h2>
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>{data.reservation.user.nombre}</p>
            <p style={{ color: '#4b5563' }}>{data.reservation.user.email}</p>
            <p style={{ color: '#4b5563' }}>Cliente ID: {data.reservation.user._id.slice(-8)}</p>
          </div>
        </div>
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Building2 style={{ marginRight: '0.5rem' }} size={20} />
            HOTEL:
          </h2>
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <p style={{ fontWeight: 600, fontSize: '1.125rem' }}>{data.reservation.hotel.name}</p>
            <p style={{ color: '#4b5563' }}>{data.reservation.hotel.direction}</p>
            <p style={{ color: '#4b5563' }}>{data.reservation.hotel.location}</p>
            <p style={{ color: '#4b5563' }}>Categoría: {data.reservation.hotel.category}</p>
          </div>
        </div>
      </div>

      {/* Detalles de la Reservación */}
      <div style={{ padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <Calendar style={{ marginRight: '0.5rem', color: '#2563eb' }} size={20} />
              <span style={{ fontWeight: 600 }}>Check-in</span>
            </div>
            <p style={{ fontSize: '1.125rem' }}>{formatDate(data.reservation.checkInDate)}</p>
          </div>
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <Calendar style={{ marginRight: '0.5rem', color: '#2563eb' }} size={20} />
              <span style={{ fontWeight: 600 }}>Check-out</span>
            </div>
            <p style={{ fontSize: '1.125rem' }}>{formatDate(data.reservation.checkOutDate)}</p>
          </div>
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <Bed style={{ marginRight: '0.5rem', color: '#2563eb' }} size={20} />
              <span style={{ fontWeight: 600 }}>Noches</span>
            </div>
            <p style={{ fontSize: '1.125rem' }}>{data.nights}</p>
          </div>
        </div>

        {/* Tabla de servicios */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1e40af', color: 'white' }}>
                <th style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'left', fontWeight: 600 }}>DESCRIPCIÓN</th>
                <th style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'center', fontWeight: 600 }}>CANTIDAD</th>
                <th style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'right', fontWeight: 600 }}>IMPORTE</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ border: '1px solid #e5e7eb', padding: '1rem' }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>Habitación {data.reservation.room.type}</p>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      Capacidad: {data.reservation.room.capacity} personas
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      {formatCurrency(data.roomPricePerNight)} por noche
                    </p>
                  </div>
                </td>
                <td style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'center' }}>{data.nights}</td>
                <td style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'right' }}>{formatCurrency(data.roomTotal)}</td>
              </tr>
              
              {data.services && data.services.map((service, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ border: '1px solid #e5e7eb', padding: '1rem' }}>
                    <div>
                      <p style={{ fontWeight: 600 }}>{service.name}</p>
                      <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Servicio adicional</p>
                    </div>
                  </td>
                  <td style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'center' }}>1</td>
                  <td style={{ border: '1px solid #e5e7eb', padding: '1rem', textAlign: 'right' }}>{formatCurrency(service.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '20rem' }}>
            <div style={{
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{ fontWeight: 600 }}>SUBTOTAL:</span>
                <span>{formatCurrency(data.roomTotal)}</span>
              </div>
              {data.services && data.services.length > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <span style={{ fontWeight: 600 }}>SERVICIOS:</span>
                  <span>
                    {formatCurrency(
                      data.services.reduce((sum, service) => 
                        sum + parseFloat(service.total.$numberDecimal || service.total || 0), 0
                      )
                    )}
                  </span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#1e40af',
                color: 'white',
                borderRadius: '0.25rem',
                marginTop: '0.5rem'
              }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>TOTAL:</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{formatCurrency(data.total_pagar)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.75rem' }}>OBSERVACIONES:</h3>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <p style={{ color: '#374151' }}>
              Reservación confirmada para {data.reservation.user.nombre}. 
              Estado de la reservación: {data.reservation.status}. 
              Factura generada automáticamente el {formatDate(data.Date)}.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Building2 style={{ marginRight: '0.75rem' }} size={24} />
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{data.reservation.hotel.name.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
});

InvoiceTemplate.displayName = 'InvoiceTemplate';

InvoiceTemplate.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired,
    reservation: PropTypes.shape({
      user: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
      }).isRequired,
      hotel: PropTypes.shape({
        name: PropTypes.string.isRequired,
        direction: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
      }).isRequired,
      room: PropTypes.shape({
        type: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired
      }).isRequired,
      checkInDate: PropTypes.string.isRequired,
      checkOutDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }).isRequired,
    nights: PropTypes.number.isRequired,
    roomPricePerNight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        $numberDecimal: PropTypes.string
      })
    ]).isRequired,
    roomTotal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        $numberDecimal: PropTypes.string
      })
    ]).isRequired,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.shape({
            $numberDecimal: PropTypes.string
          })
        ]).isRequired,
        total: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.shape({
            $numberDecimal: PropTypes.string
          })
        ]).isRequired
      })
    ),
    total_pagar: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        $numberDecimal: PropTypes.string
      })
    ]).isRequired
  }).isRequired
};

export default InvoiceTemplate; 