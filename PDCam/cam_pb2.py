# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: cam.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='cam.proto',
  package='gateway',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\tcam.proto\x12\x07gateway\";\n\nHumanCount\x12\r\n\x05human\x18\x01 \x01(\x05\x12\x0e\n\x06mindeg\x18\x02 \x01(\x05\x12\x0e\n\x06maxdeg\x18\x03 \x01(\x05\"X\n\x02\x43\x43\x12$\n\x05\x63olor\x18\x01 \x01(\x0e\x32\x15.gateway.CC.ColorType\",\n\tColorType\x12\x0b\n\x07RAINBOW\x10\x00\x12\x08\n\x04GRAY\x10\x01\x12\x08\n\x04IRON\x10\x02\"\x06\n\x04Null2d\n\x07SHRoute\x12/\n\x07SendDeg\x12\x13.gateway.HumanCount\x1a\r.gateway.Null\"\x00\x12(\n\x08\x43hangeCC\x12\x0b.gateway.CC\x1a\r.gateway.Null\"\x00\x62\x06proto3')
)



_CC_COLORTYPE = _descriptor.EnumDescriptor(
  name='ColorType',
  full_name='gateway.CC.ColorType',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='RAINBOW', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='GRAY', index=1, number=1,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='IRON', index=2, number=2,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=127,
  serialized_end=171,
)
_sym_db.RegisterEnumDescriptor(_CC_COLORTYPE)


_HUMANCOUNT = _descriptor.Descriptor(
  name='HumanCount',
  full_name='gateway.HumanCount',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='human', full_name='gateway.HumanCount.human', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='mindeg', full_name='gateway.HumanCount.mindeg', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='maxdeg', full_name='gateway.HumanCount.maxdeg', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=22,
  serialized_end=81,
)


_CC = _descriptor.Descriptor(
  name='CC',
  full_name='gateway.CC',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='color', full_name='gateway.CC.color', index=0,
      number=1, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _CC_COLORTYPE,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=83,
  serialized_end=171,
)


_NULL = _descriptor.Descriptor(
  name='Null',
  full_name='gateway.Null',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=173,
  serialized_end=179,
)

_CC.fields_by_name['color'].enum_type = _CC_COLORTYPE
_CC_COLORTYPE.containing_type = _CC
DESCRIPTOR.message_types_by_name['HumanCount'] = _HUMANCOUNT
DESCRIPTOR.message_types_by_name['CC'] = _CC
DESCRIPTOR.message_types_by_name['Null'] = _NULL
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

HumanCount = _reflection.GeneratedProtocolMessageType('HumanCount', (_message.Message,), dict(
  DESCRIPTOR = _HUMANCOUNT,
  __module__ = 'cam_pb2'
  # @@protoc_insertion_point(class_scope:gateway.HumanCount)
  ))
_sym_db.RegisterMessage(HumanCount)

CC = _reflection.GeneratedProtocolMessageType('CC', (_message.Message,), dict(
  DESCRIPTOR = _CC,
  __module__ = 'cam_pb2'
  # @@protoc_insertion_point(class_scope:gateway.CC)
  ))
_sym_db.RegisterMessage(CC)

Null = _reflection.GeneratedProtocolMessageType('Null', (_message.Message,), dict(
  DESCRIPTOR = _NULL,
  __module__ = 'cam_pb2'
  # @@protoc_insertion_point(class_scope:gateway.Null)
  ))
_sym_db.RegisterMessage(Null)



_SHROUTE = _descriptor.ServiceDescriptor(
  name='SHRoute',
  full_name='gateway.SHRoute',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=181,
  serialized_end=281,
  methods=[
  _descriptor.MethodDescriptor(
    name='SendDeg',
    full_name='gateway.SHRoute.SendDeg',
    index=0,
    containing_service=None,
    input_type=_HUMANCOUNT,
    output_type=_NULL,
    serialized_options=None,
  ),
  _descriptor.MethodDescriptor(
    name='ChangeCC',
    full_name='gateway.SHRoute.ChangeCC',
    index=1,
    containing_service=None,
    input_type=_CC,
    output_type=_NULL,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_SHROUTE)

DESCRIPTOR.services_by_name['SHRoute'] = _SHROUTE

# @@protoc_insertion_point(module_scope)