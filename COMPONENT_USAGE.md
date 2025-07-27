# 📚 Guía de Uso de Componentes UI

## 🔧 Componentes y sus Props Correctos

### Select Component

El componente `Select` de Radix UI usa `onValueChange` en lugar de `onChange`.

#### ❌ Incorrecto:
```tsx
<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <SelectItem value="option1">Option 1</SelectItem>
</Select>
```

#### ✅ Correcto:
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectItem value="option1">Option 1</SelectItem>
</Select>
```

#### Ejemplo Completo:
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opción 1</SelectItem>
        <SelectItem value="option2">Opción 2</SelectItem>
        <SelectItem value="option3">Opción 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Button Component

El componente `Button` soporta diferentes variantes y estados.

#### Variantes Disponibles:
- `default` (por defecto)
- `destructive`
- `outline`
- `secondary`
- `ghost`
- `link`

#### Tamaños Disponibles:
- `default` (por defecto)
- `sm`
- `lg`
- `icon`

#### Ejemplo:
```tsx
import { Button } from "@/components/ui/button";

function MyComponent() {
  return (
    <div>
      <Button variant="default" size="default">
        Botón Principal
      </Button>
      <Button variant="outline" size="sm">
        Botón Secundario
      </Button>
      <Button variant="destructive" size="lg">
        Eliminar
      </Button>
    </div>
  );
}
```

### Input Component

El componente `Input` es un wrapper simple sobre el input HTML nativo.

#### Ejemplo:
```tsx
import { Input } from "@/components/ui/input";

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <Input
      type="text"
      placeholder="Escribe algo..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Card Component

El componente `Card` proporciona una estructura consistente para contenido.

#### Ejemplo:
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título de la Tarjeta</CardTitle>
        <CardDescription>Descripción de la tarjeta</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contenido de la tarjeta</p>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Estilos y Temas

### Clases de Utilidad

El proyecto usa Tailwind CSS con clases de utilidad personalizadas:

```tsx
// Colores del tema
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-muted text-muted-foreground"

// Estados
className="hover:bg-accent hover:text-accent-foreground"
className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

### Responsive Design

```tsx
// Breakpoints
className="w-full md:w-1/2 lg:w-1/3"
className="text-sm md:text-base lg:text-lg"
className="p-4 md:p-6 lg:p-8"
```

## 🔒 Validación y Manejo de Errores

### Validación de Formularios

```tsx
import { validateEmail, validatePassword } from "@/lib/security";

function MyForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: "Email inválido" }));
      return;
    }

    // Validar contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setErrors(prev => ({ ...prev, password: passwordValidation.errors[0] }));
      return;
    }

    // Enviar formulario
    console.log("Formulario válido");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={errors.email ? "border-red-500" : ""}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={errors.password ? "border-red-500" : ""}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      
      <Button type="submit">Enviar</Button>
    </form>
  );
}
```

## 📱 Accesibilidad

### ARIA Labels

```tsx
<Button aria-label="Cerrar modal">
  <X className="h-4 w-4" />
</Button>

<Input
  aria-label="Buscar usuarios"
  placeholder="Buscar..."
  type="search"
/>
```

### Navegación por Teclado

```tsx
<Select onValueChange={setValue} onKeyDown={(e) => {
  if (e.key === 'Escape') {
    // Cerrar select
  }
}}>
  {/* ... */}
</Select>
```

## 🚀 Mejores Prácticas

### 1. Manejo de Estados

```tsx
// ✅ Correcto: Usar estados específicos
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<MyDataType | null>(null);

// ❌ Incorrecto: Estado genérico
const [state, setState] = useState({ loading: false, error: null, data: null });
```

### 2. Event Handlers

```tsx
// ✅ Correcto: Tipos específicos
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// ✅ Correcto: Para Select
const handleSelectChange = (value: string) => {
  setValue(value);
};
```

### 3. Componentes Reutilizables

```tsx
// ✅ Correcto: Props tipadas
interface MyComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  variant?: 'default' | 'outline';
}

function MyComponent({ title, description, onAction, variant = 'default' }: MyComponentProps) {
  return (
    <Card className={variant === 'outline' ? 'border-2' : ''}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {onAction && (
        <CardContent>
          <Button onClick={onAction}>Acción</Button>
        </CardContent>
      )}
    </Card>
  );
}
```

## 🔧 Solución de Problemas Comunes

### Error: "Property 'onChange' does not exist on type 'Select'"

**Solución:** Usar `onValueChange` en lugar de `onChange`:

```tsx
// ❌ Incorrecto
<Select onChange={(e) => setValue(e.target.value)}>

// ✅ Correcto
<Select onValueChange={setValue}>
```

### Error: "Type 'string' is not assignable to type 'number'"

**Solución:** Convertir el valor si es necesario:

```tsx
// Para inputs numéricos
<Input
  type="number"
  value={numberValue}
  onChange={(e) => setNumberValue(Number(e.target.value))}
/>

// Para selects con valores numéricos
<Select onValueChange={(value) => setNumberValue(Number(value))}>
```

### Error: "Component is missing required props"

**Solución:** Proporcionar todas las props requeridas:

```tsx
// ✅ Correcto: Todas las props requeridas
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

## 📚 Recursos Adicionales

- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components) 