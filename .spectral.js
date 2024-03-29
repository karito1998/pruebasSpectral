#oas2 (OpenAPI v2.0)
#oas3 (OpenAPI v3.x)
#oas3_0 (OpenAPI v3.0.x)
# json-schema ($schema says this is some JSON Schema draft)
#error: '{{error}}' - description: '{{description}}' -path: '{{path}}' -property: '{{property}}' -value: '{{value}}'
#Error #1: the value has to be one of: 0, 1, 2, 3 or "error", "warn", "info", "hint", "off"

#Este set de reglas solo funciona para Swagger 2
#functions: [security, log]
rules:
#Validar el uso de x-ibm-comment
  x-ibm-comment-exists:
    description: "Generar un error si se encuentra la etiqueta x-ibm-comment."
    given: "$.x-ibm-comment"
    severity: warn
    message: "La etiqueta 'x-ibm-comment' NO debe estar presente en el documento" 
    then:
      function: falsy

#Validar el uso de comment
  comment-exists:
    description: "Generar un error si se encuentra 'comment'."
    given: "$..comment"
    severity: warn
    message: "La etiqueta 'comment' NO debe estar presente en el documento"
    then:
      function: falsy

#Validar el uso de console.error
  console-error-exists:
    description: "Generar un error si se encuentra 'console.error'."
    message: "el uso de console.error()' NO debe estar presente en el documento" 
    severity: error
    given: "$..*"
    then:
      function: pattern
      functionOptions:
        notMatch: "console\.error"

#Validar la existencia de la etiqueta endpoint en todos los catálogos
  endpoints-exists:
    description: "Validar que para cada catalogo exista un endpoint"
    message: "Es necesaria la definición de un endpoint en el catalogo" 
    severity: error
    given: "$.x-ibm-configuration.catalogs..properties"
    then:
      field: "endpoint"
      function: truthy
     

#Validar etiqueta endpoint con url y no IP en todos los catalogos
  endpoints-are-defined:
    description: "Validar que para cada catalogo exista un endpoint con URL y no con IP"
    message: "El endpoint debe ser una URL valida y no usar IPs -> {{value}}" 
    severity: error
    given: "$.x-ibm-configuration.catalogs..endpoint"
    then:
      function: pattern
      functionOptions:
        notMatch: /(?:\d{1,3}\.){3}\d{1,3}/

#Validar que se tenga una definicion de seguridad
#  no-securityDefinitions:
#    description: "Todas las Apis deben contar con una definición de seguridad valida y completa"
#    message: "{{error}}"
#    severity: error
#    given: "$.securityDefinitions"
#    then: 
#      function: security

#validar el uso de application/json de modo obligatorio y sin variantes en consumes
  validate-swagger-consumes:
    description: "la etiqueta 'consumes' solo debe contener el valor `application/json`"
    severity: error
    message: "{{description}}: valor encontrado: '{{value}}'"
    given: $.consumes
    then:
      function: schema
      functionOptions:
        schema:
          type: array
          maxItems: 1 
          contains:
            type: string            
            enum:
              - application/json

#validar el uso de application/json de modo obligatorio y sin variantes en produces
  validate-swagger-produces:
    description: "la etiqueta 'produces' solo debe contener el valor `application/json`"
    severity: error
    message: "{{description}} valor encontrado: '{{value}}'"
    given: "$.produces"
    then:
      function: schema
      functionOptions:
        schema:
          type: array
          maxItems: 1
          contains:
            type: string
            enum:
              - application/json

#En el meta debe ser obligatorio el _requestDateTime, _messageId y _applicationId   
  validate-meta:
    description: "Se valida que en el meta se encuentren los items obligatorios _requestDateTime, _messageId y _applicationId"
    severity: error
    message: "{{description}} valores encontrados: '{{value}}'"
    given: "$.definitions.meta.required"
    then:
      function: schema
      functionOptions:
        schema:
          type: array
          minItems: 3
          contains:
            type: string
            enum:
              - _messageId
              - _requestDateTime
              - _applicationId

# validar obligatoriedad de _messageId, _requestDateTime, y _applicationId en meta de respuesta
  validate-_messageId-exists:
    description: "Se valida que en el meta _messageId esté presente"
    severity: error
    message: "_messageId es un campo obligatorio en el meta'"
    given: "$.definitions.meta.properties"
    then:
      field: _messageId
      function: truthy

  validate-_requestDateTime-exists:
    description: "Se valida que en el meta _requestDateTime esté presente"
    severity: error
    message: "_requestDateTime es un campo obligatorio en el meta'"
    given: "$.definitions.meta.properties"
    then:
      field: _requestDateTime
      function: truthy

  validate-_applicationId-exists:
    description: "Se valida que en el meta _applicationId esté presente"
    severity: error
    message: "_applicationId es un campo obligatorio en el meta'"
    given: "$.definitions.meta.properties"
    then:
      field: _applicationId
      function: truthy

  validate-requestDateTimeFormat-exists:
    description: "Se valida que en el meta _requestDateTime.format esté presente"
    severity: error
    message: "_requestDateTime es un campo obligatorio en el meta'"
    given: "$.definitions.meta.properties._requestDateTime"
    then:
      field: format
      function: truthy
  
#En el meta el _requestDateTime, debe tener un format date-time   
  validate-requestDateTime:
    description: "Se valida que en el meta se _requestDateTime con un format: date-time"
    severity: error
    message: "_requestDateTime debe tener un format: date-time, valor encontrado: '{{value}}'"
    given: "$.definitions.meta.properties._requestDateTime"
    then:
      field: format
      function: pattern
      functionOptions:
        match: "date-time"
      
#validar obligatoriedad de contentype en headers de respuesta
  validate-response-Content-Type-header:
    description: "Content-Type es un header obligatorio en la respuesta"
    message: "{{description}}"
    severity: error
    given: "$.paths...responses.200.headers"
    then:
      field: Content-Type
      function: truthy

  validate-response-API-Version-header:
    description: "API-Version es un header obligatorio en la respuesta"
    message: "{{description}}"
    severity: error
    given: "$.paths...responses.200.headers"
    then:
      field: API-Version
      function: truthy

  validate-response-RateLimit-Limit-header:
    description: "RateLimit-Limit es un header obligatorio en la respuesta"
    message: "{{description}}"
    severity: error
    given: "$.paths...responses.200.headers"
    then:
      field: RateLimit-Limit
      function: truthy

  validate-response-Message-Id-header:
    description: "Message-Id es un header obligatorio en la respuesta"
    message: "{{description}}"
    severity: error
    given: "$.paths...responses.200.headers"
    then:
      field: Message-Id
      function: truthy

#validar en las cabeceras el uso de prefijo x- (no permitido) y separación con –
  no-x-headers:
    message: 'Header `{{value}}` no debe iniciar con "X-".'
    description: "Las cabeceras no deben iniciar con x-"
    severity: error
    given: "$..parameters[?(@.in === 'header')].name"
    then: 
      function: pattern
      functionOptions: 
        notMatch: "^(x|X)-"
    
#validar que los nombres de los campos del response sean alfanuméricos y que no contengan caracteres especiales, ni inicien con numero
  path-response-naming-convention:
    description: "Los campos del response deben ser alfanuméricos y no contener caracteres especiales, ni iniciar con numero"
    given: $.definitions[*].properties.data.properties
    severity: error
    message: "{{description}}, '{{property}}' no sigue la convención de nombres."
    then:
      field: "@key"
      function: pattern
      functionOptions:
        match: "^[a-zA-Z][a-zA-Z0-9]*$"


#validar estructura de definición de respuesta fallida
  validate-error-response:
    description: "Validar la respuesta para códigos de estado de error."
    given: "$.definitions.failure.properties"
    severity: error
    message: "La definicion de la respuesta para error no coincide con la estructura esperada (meta y errors)."
    then:
      function: schema
      functionOptions:
        schema:
          type: object
          required:
            - meta
            - errors
  
  validate-error-property-response:
    description: "Validar la estructura de objeto error para respuesta."
    given: "$.definitions.error.properties"
    severity: error
    message: "La definicion de la respuesta para error no coincide con la estructura esperada (code y detail)."
    then:
      function: schema
      functionOptions:
        schema:
          type: object
          required:
            - code
            - detail
      
#Agregar validacion de execute: [], finally:[], otherwise:[],errors:[]",
 
  validate-empty-execute:
    description: "Validar que la propiedad 'execute' está presente pero vacía."
    given: "$..execute"
    severity: error
    message: "La propiedad 'execute' debe estar presente pero vacía."
    then:
      field: "@key"
      function: truthy
      
  validate-empty-finally:
    description: "Validar que la propiedad 'finally' no debe estar presente."
    given: "$..finally"
    severity: warn
    message: "La propiedad 'finally' no debe estar presente."
    then:
      function: falsy
  
  validate-empty-otherwise:
    description: "Validar que la propiedad 'otherwise' está presente pero vacía."
    given: "$..otherwise"
    severity: error
    message: "La propiedad 'otherwise' debe estar presente pero vacía."
    then:
      field: "@key"
      function: truthy
  
  validate-empty-errors:
    description: "Validar que la propiedad 'errors' está presente pero vacía."
    given: "$..errors"
    severity: error
    message: "La propiedad 'errors' debe estar presente pero vacía."
    then:
      field: "@key"
      function: truthy
      
####AQUI VOY    
# request-support-json-oas3": {
#       message:
#         "Every request SHOULD support at least one `application/json` content type.",
#       description:
#         "Maybe you've got an XML heavy API or you're using a special binary format like BSON or CSON. That's lovely, but supporting JSON too is going to help a lot of people avoid a lot of confusion, and probably make you more money than you spend on supporting it.",
#       given: "$.paths[*][*].requestBody.content",
#       then: {
#         function: schema,
#         functionOptions: {
#           schema: {
#             type: "object",
#             properties: {
#               "application/json": true,
#             },
#             required: ["application/json"],
#           },
#         },
#       },
#       formats: [oas3],
#       severity: DiagnosticSeverity.Warning,
#     },
  # # Regla para verificar si las operaciones tienen descripciones
  # operation-description-missing:
  #   given: $.paths[*][*]
  #   message: "La operacion '{{path}}' no tiene una descripción."
  #   severity: error
  #   then:
  #     field: description
  #     function: truthy

  # # Regla para verificar si los nombres de las rutas siguen una convención
  # path-naming-convention:
  #   description: "Regla para verificar si los nombres de las rutas siguen una convención"
  #   given: $.paths
  #   severity: errors
  #   then:
  #     field: paths
  #     function: pattern
  #     functionOptions:
  #       match: "^[0-9_]+$"
  #       notMatch: "^api_"
  #   message: "La ruta '{{property}}' no sigue la convención de nombres."
        

  # # Regla para verificar si todos los parámetros tienen descripciones
  # parameter-description-missing:
  #   given: $.paths[*][*].parameters[*]
  #   message: "En la operacion '{{path}}' no existe una descripción. "
  #   severity: error
  #   then:
  #     field: description
  #     function: truthy





# adidas-oas3-request-support-json:
#     description: Every request MUST support `application/json` media type
#     formats:
#       - oas3
#     recommended: true
#     severity: error
#     message: "{{description}}: {{error}}"
#     given: $.paths.[*].requestBody.content[?(@property.indexOf('json') === -1)]^
#     then:
#       function: falsy

# "request-support-json-oas3": {
#       message:
#         "Every request SHOULD support at least one `application/json` content type.",
#       description:
#         "Maybe you've got an XML heavy API or you're using a special binary format like BSON or CSON. That's lovely, but supporting JSON too is going to help a lot of people avoid a lot of confusion, and probably make you more money than you spend on supporting it.",
#       given: "$.paths[*][*].requestBody.content",
#       then: {
#         function: schema,
#         functionOptions: {
#           schema: {
#             type: "object",
#             properties: {
#               "application/json": true,
#             },
#             required: ["application/json"],
#           },
#         },
#       },
#       formats: [oas3],
#       severity: DiagnosticSeverity.Warning,
#     },

  # adidas-oas3-response-success-hal:
  #   description: "All success responses MUST be of media type `application/hal+json` "
  #   severity: error
  #   given: $.paths..responses[?( @property >= 201 && @property < 300 && @property != 204)].content[*]~
  #   recommended: true
  #   # type: "style"
  #   formats:
  #     - oas3
  #   message: "Response documents MUST be of application/hal+json media types: {{error}}"
  #   then:
  #     function: enumeration
  #     functionOptions:
  #       values:
  #         - application/hal+json

    #   "api-health": {
    #   message: "APIs MUST have a health path (`/health`) defined.",
    #   description:
    #     "Creating a `/health` endpoint is a simple solution for pull-based monitoring and manually checking the status of an API. To learn more about health check endpoints see https://apisyouwonthate.com/blog/health-checks-with-kubernetes.",
    #   given: "$.paths",
    #   then: {
    #     field: "/health",
    #     function: truthy,
    #   },
    #   severity: DiagnosticSeverity.Warning,
    # },

  

    #     "request-GET-no-body-oas2": {
    #   message: "A `GET` request MUST NOT accept a request body.",
    #   description:
    #     "Defining a request body on a HTTP GET is technically possible in some implementations, but is increasingly frowned upon due to the confusion that comes from unspecified behavior in the HTTP specification.",
    #   given: "$.paths..get.parameters..in",
    #   then: {
    #     function: pattern,
    #     functionOptions: {
    #       notMatch: "/^body$/",
    #     },
    #   },
    #   severity: DiagnosticSeverity.Error,
    #   formats: [oas2],
    # },

    # // Author: Andrzej (https://github.com/jerzyn)
    # "request-GET-no-body-oas3": {
    #   message: "A `GET` request MUST NOT accept a request body.",
    #   description:
    #     "Defining a request body on a HTTP GET is in some implementations, but is increasingly frowned upon due to the confusion that comes from unspecified behavior in the HTTP specification.",
    #   given: "$.paths..get.requestBody",
    #   then: {
    #     function: undefinedFunc,
    #   },
    #   formats: [oas3],
    #   severity: DiagnosticSeverity.Error,
    # },


    #  az-operation-summary-or-description:
    # description: Operation should have a summary or description.
    # message: Operation should have a summary or description.
    # severity: warn
    # given:
    # - $.paths[*][?( @property === 'get' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'put' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'post' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'patch' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'delete' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'options' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'head' && !@.summary && !@.description )]
    # - $.paths[*][?( @property === 'trace' && !@.summary && !@.description )]
    # then:
    #   function: falsy
