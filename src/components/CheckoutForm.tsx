
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { state, clearCart } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sendToWhatsApp = (orderDetails: string) => {
    const whatsappNumber = "+254708921377";
    const message = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format order details for WhatsApp
      const orderDetails = `
🛒 *NEW ORDER*

👤 *Customer Details:*
Name: ${formData.customerName}
Phone: ${formData.customerPhone}
${formData.customerEmail ? `Email: ${formData.customerEmail}` : ''}

📦 *Order Items:*
${state.items.map(item => 
  `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
).join('\n')}

💰 *Total: ${formatPrice(state.total)}*

📅 Order Date: ${new Date().toLocaleString()}
      `.trim();

      // Send to WhatsApp
      sendToWhatsApp(orderDetails);
      
      // Clear cart and form
      clearCart();
      setFormData({ customerName: '', customerEmail: '', customerPhone: '' });
      
      toast({
        title: "Order sent successfully!",
        description: "Your order has been sent to WhatsApp. We'll contact you soon.",
      });
    } catch (error) {
      console.error('Order submission failed:', error);
      toast({
        title: "Order Failed",
        description: "There was a problem sending your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customerPhone">Phone Number *</Label>
            <Input
              id="customerPhone"
              name="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customerEmail">Email (Optional)</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleInputChange}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-amber-900 hover:bg-amber-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending Order...' : 'Send Order to WhatsApp'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
