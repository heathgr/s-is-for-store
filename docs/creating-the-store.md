{% codetabs name="TypeScript", type="ts" -%}
const store = createStore({ message: '' })
{%- language name="JavaScript", type="js" -%}
const store = createStore({ message: '' })
{%- endcodetabs %}


{% tabs first="First Tab", second="Second Tab", third="Third Tab" %}

{% content "first" %}
Content for first tab ...

{% content "second" %}
Content for second tab ...

{% content "third" %}
Content for third tab ...

{% endtabs %}
