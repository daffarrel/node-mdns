const udp          = require('dgram');
const Packet       = require('dns2/packet');
const EventEmitter = require('events');
/**
 * Multicast DNS
 * @docs https://www.ietf.org/rfc/rfc6762.txt
 */
function MulticastDNS(){
  EventEmitter.call(this);
  this.socket = dgram.createSocket();
  this.socket.on('message', (message, rinfo) => {
    const packet = Packet.parse(message);
    this.emit(message.type, message, rinfo);
  });
  this.socket.on('listening', () => {
    this.socket.addMembership('224.0.0.251');
    socket.setMulticastTTL(255);
    socket.setMulticastLoopback(true)
  });
}

MulticastDNS.prototype.query = function(question, rinfo){
  const packet = new Packet(question);
  const message = packet.toBuffer();
  socket.send(message, 0, message.length,
    rinfo.port, rinfo.address || rinfo.host)
};

module.exports = MulticastDNS;