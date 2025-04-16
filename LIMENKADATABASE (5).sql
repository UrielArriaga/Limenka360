CREATE TABLE "Results" (
  "id" serial PRIMARY KEY,
  "amount" float8,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "actions" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255),
  "system" bool DEFAULT false
);

CREATE TABLE "activities" (
  "id" varchar(255) PRIMARY KEY,
  "type" varchar(255) NOT NULL,
  "from" varchar(255) NOT NULL,
  "message" varchar(255) DEFAULT '',
  "data" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ejecutiveId" varchar(255) NOT NULL,
  "groupId" varchar(255) NOT NULL,
  "companyId" varchar(255) NOT NULL
);

CREATE TABLE "additionalinformations" (
  "id" varchar(255) PRIMARY KEY,
  "approvedlogistics" bool DEFAULT false,
  "approvedlogisticsdate" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "approvedlogisticsbyId" varchar(255),
  "typeproducts" int4,
  "trainingrequest" bool DEFAULT false,
  "installationrequest" bool DEFAULT false
);

CREATE TABLE "addresses" (
  "id" varchar(255) PRIMARY KEY,
  "street" varchar(255) NOT NULL,
  "int_number" varchar(255) DEFAULT '',
  "ext_number" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "postalId" varchar(255),
  "cityId" varchar(255),
  "entityId" varchar(255),
  "references" text DEFAULT '',
  "settlement" varchar(255) DEFAULT '',
  "companyId" varchar(255)
);

CREATE TABLE "administrationgroups" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ejecutiveId" varchar(255),
  "groupId" varchar(255)
);

CREATE TABLE "bidders" (
  "id" varchar(255) PRIMARY KEY,
  "institution" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "prospectId" varchar(255)
);

CREATE TABLE "bills" (
  "id" varchar(255) PRIMARY KEY,
  "url" text DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "rfc" varchar(255) NOT NULL,
  "class" varchar(255) DEFAULT '',
  "withheldtaxes" varchar(255) DEFAULT '',
  "transferedtaxes" varchar(255) DEFAULT '',
  "customsnumber" varchar(255) DEFAULT '',
  "customsdate" timestamptz,
  "addressId" varchar(255),
  "billedbyId" varchar(255),
  "businessname" text NOT NULL,
  "folio" varchar(255) DEFAULT '',
  "phone" varchar(255) DEFAULT '',
  "total" float8 DEFAULT 0,
  "cfdiId" varchar(255),
  "paymentmethodId" varchar(255),
  "paymentwayId" varchar(255),
  "taxregimeId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "biomedicalwarranties" (
  "id" varchar(255) PRIMARY KEY,
  "title" varchar(255) DEFAULT '',
  "folio" varchar(255) DEFAULT '',
  "reportingdate" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "warehouseproductId" varchar(255),
  "createdbyId" varchar(255)
);

CREATE TABLE "brandlines" (
  "id" varchar(255) PRIMARY KEY,
  "line" varchar(255) NOT NULL,
  "comission" float8 DEFAULT 0,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255),
  "system" bool DEFAULT false
);

CREATE TABLE "brands" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "brandlineId" varchar(255),
  "isactive" bool DEFAULT true,
  "system" bool DEFAULT false
);

CREATE TABLE "budgets" (
  "id" varchar(255) PRIMARY KEY,
  "folio" varchar(255) DEFAULT '',
  "validity" timestamptz,
  "budgettype" varchar(255) DEFAULT '',
  "deliverytime" varchar(255) DEFAULT '',
  "observations" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "prospectId" varchar(255),
  "createdbyId" varchar(255),
  "ejecutiveId" varchar(255),
  "assignedbyId" varchar(255)
);

CREATE TABLE "buyers" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "other" bool DEFAULT false,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "cancellationreasons" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "categories" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255),
  "system" bool DEFAULT false
);

CREATE TABLE "cfdis" (
  "id" varchar(255) PRIMARY KEY,
  "name" text NOT NULL,
  "code" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "changes" (
  "id" varchar(255) PRIMARY KEY,
  "error" text NOT NULL,
  "description" text,
  "status" int4,
  "reportdate" timestamptz,
  "enddate" timestamptz,
  "ejecutive" text,
  "evidence" text,
  "express" bool,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "channels" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255)
);

CREATE TABLE "cities" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "longitude" varchar(255),
  "latitude" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "entityId" varchar(255)
);

CREATE TABLE "clientcompanies" (
  "id" varchar(255) PRIMARY KEY,
  "companyname" varchar(255) NOT NULL,
  "street" varchar(255) DEFAULT '',
  "email" varchar(255) DEFAULT '',
  "phone" varchar(255) DEFAULT '',
  "optionalophone" varchar(255) DEFAULT '',
  "rfc" varchar(255) DEFAULT '',
  "photo" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ejecutiveId" varchar(255),
  "commercialbusinessId" varchar(255),
  "postalId" varchar(255),
  "cityId" varchar(255),
  "entityId" varchar(255),
  "eslicitante" bool DEFAULT false,
  "amount" float8 DEFAULT 0
);

CREATE TABLE "clienttypes" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255)
);

CREATE TABLE "clossingreasons" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255),
  "system" bool DEFAULT false
);

CREATE TABLE "commercialbusinesses" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "commisions" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "companyname" varchar(255) NOT NULL,
  "min" float8 DEFAULT 0,
  "max" float8 DEFAULT 0,
  "commission" float8 DEFAULT 0,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "groupId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "companies" (
  "id" varchar(255) PRIMARY KEY,
  "company" varchar(255) NOT NULL,
  "street" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "phone" varchar(255) NOT NULL,
  "optionalphone" varchar(255) DEFAULT '',
  "rfc" varchar(255) NOT NULL,
  "photo" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "postalId" varchar(255),
  "cityId" varchar(255),
  "commercialbusinessId" varchar(255),
  "entityId" varchar(255),
  "bg" varchar(255),
  "primarycolor" varchar(255) DEFAULT '',
  "secondarycolor" varchar(255) DEFAULT '',
  "validaccount" bool DEFAULT false,
  "outsider" bool DEFAULT false
);

CREATE TABLE "conceptimports" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "conditionspayments" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "configs" (
  "id" varchar(255) PRIMARY KEY,
  "bg" varchar(255),
  "style" varchar(255),
  "theme" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ejecutiveId" varchar(255),
  "styles" jsonb DEFAULT '{}'
);

CREATE TABLE "deliveryroutes" (
  "id" varchar(255) PRIMARY KEY,
  "assigned_date" timestamptz,
  "km_output" int4,
  "km_arrival" int4,
  "comment" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "driverId" varchar(255),
  "transportunitId" varchar(255),
  "url" varchar(255) DEFAULT '',
  "orderId" varchar(255),
  "deliveryAt" timestamptz,
  "delivered" bool DEFAULT false,
  "urlnote" varchar(255) DEFAULT '',
  "urlcart" varchar(255) DEFAULT '',
  "warehouseId" varchar(255),
  "createdbyId" varchar(255),
  "alias" varchar(255) DEFAULT ''
);

CREATE TABLE "deliverytimes" (
  "id" varchar(255) PRIMARY KEY,
  "deliverytimes" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "demosales" (
  "id" varchar(255) PRIMARY KEY,
  "date" timestamptz DEFAULT '2025-02-11 12:47:08.474-06',
  "dessignatedunit" varchar(255) DEFAULT 0,
  "expensebudget" float8 DEFAULT 0,
  "assignedinstructor" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "oportunityId" varchar(255),
  "addressId" varchar(255),
  "orderstatusId" varchar(255)
);

CREATE TABLE "distributorclients" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "distributorId" varchar(255),
  "buyerId" varchar(255),
  "entityId" varchar(255)
);

CREATE TABLE "distributorentities" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "distributorId" varchar(255),
  "entityId" varchar(255)
);

CREATE TABLE "distributors" (
  "id" varchar(255) PRIMARY KEY,
  "companyname" varchar(255) NOT NULL,
  "saleamount" float8 DEFAULT 0,
  "gobsale" bool DEFAULT true,
  "multiplecompanyname" bool DEFAULT false,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "prospectId" varchar(255),
  "commercialbusinessId" varchar(255)
);

CREATE TABLE "docs" (
  "id" varchar(255) PRIMARY KEY,
  "name" text NOT NULL,
  "url" text NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "orderId" varchar(255),
  "oportunityId" varchar(255),
  "prospectId" varchar(255),
  "filestypeId" varchar(255),
  "companyId" varchar(255),
  "fileextension" text DEFAULT '',
  "uploadbyId" varchar(255),
  "size" float8,
  "warehouseproductId" varchar(255),
  "purchaseorderId" varchar(255),
  "isevidence" bool DEFAULT false,
  "budgetId" varchar(255)
);

CREATE TABLE "drivers" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) DEFAULT '',
  "RFC" varchar(255) DEFAULT '',
  "license" varchar(255) DEFAULT '',
  "expiration_date" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ejecutivedriverId" varchar(255),
  "type_license" varchar(255) DEFAULT '',
  "emergency_number" varchar(255) DEFAULT '',
  "emergency_contact" varchar(255) DEFAULT '',
  "CURP" varchar(255) DEFAULT '',
  "NSS" varchar(255) DEFAULT ''
);

CREATE TABLE "ejecutivediscounts" (
  "id" varchar(255) PRIMARY KEY,
  "approved" bool DEFAULT false,
  "denied" bool DEFAULT false,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "prospectId" varchar(255),
  "ejecutiveId" varchar(255),
  "deniedbyId" varchar(255),
  "approvedbyId" varchar(255),
  "concept" varchar(255) DEFAULT '',
  "total" float8 DEFAULT 0,
  "subtotal" float8 DEFAULT 0,
  "iva" float8 DEFAULT 0,
  "ivatotal" float8 DEFAULT 0,
  "totalextracosts" float8 DEFAULT 0,
  "discount" float8 DEFAULT 0,
  "dispercentage" float8 DEFAULT 0,
  "comission" float8 DEFAULT 0,
  "compercentage" float8 DEFAULT 0,
  "companyId" varchar(255)
);

CREATE TABLE "ejecutivegoals" (
  "id" varchar(255) PRIMARY KEY,
  "progress" float8 DEFAULT 0,
  "finalgoal" float8 DEFAULT 0,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "ejecutiveId" varchar(255),
  "companyId" varchar(255),
  "groupId" varchar(255),
  "goalId" varchar(255),
  "initialperiodate" timestamptz,
  "finalperiodate" timestamptz,
  "socketcode" varchar(255) DEFAULT '',
  "notified" bool DEFAULT false,
  "createdbyId" varchar(255),
  "identifier" varchar(255) DEFAULT '',
  "companyBelongsId" varchar(255)
);

CREATE TABLE "ejecutives" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "lastname" varchar(255),
  "email" varchar(255),
  "phone" varchar(255),
  "optionalphone" varchar(255) DEFAULT '',
  "password" varchar(255),
  "isonline" bool DEFAULT false,
  "photo" varchar(255) DEFAULT '',
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255),
  "groupId" varchar(255),
  "isactive" bool DEFAULT true,
  "oportcount" int4 DEFAULT 0,
  "username" varchar(255),
  "isverified" bool DEFAULT true,
  "title" varchar(255) DEFAULT '',
  "fullname" varchar(255) DEFAULT '',
  "comission" float8 DEFAULT 0,
  "newcomission" float8 DEFAULT 0,
  "warehouseId" varchar(255),
  "token" varchar(255)
);

CREATE TABLE "tokens" (
  "id" varchar(255) PRIMARY KEY,
  "token" varchar(255),
  "ejecutiveId" varchar(255)
);

CREATE TABLE "entities" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "longitude" varchar(255),
  "latitude" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "extracosts" (
  "id" varchar(255) PRIMARY KEY,
  "totalcost" float8 DEFAULT 0,
  "shipping" float8 DEFAULT 0,
  "installation" float8 DEFAULT 0,
  "training" float8 DEFAULT 0,
  "shippinginsurance" float8 DEFAULT 0,
  "exportcost" float8 DEFAULT 0,
  "ensurance" float8 DEFAULT 0,
  "extraweight" float8 DEFAULT 0,
  "extradimenssions" float8 DEFAULT 0,
  "extrapacking" float8 DEFAULT 0,
  "maintenance" float8 DEFAULT 0,
  "extra" float8 DEFAULT 0,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "oportunityId" varchar(255),
  "showtable" bool DEFAULT false,
  "companyId" varchar(255)
);

CREATE TABLE "extracts" (
  "id" varchar(255) PRIMARY KEY,
  "extract" varchar(255),
  "author" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "filestypes" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "formats" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) DEFAULT '',
  "url" varchar(255) DEFAULT '',
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "groupId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "goalnames" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "socketcode" varchar(255) DEFAULT '',
  "system" bool DEFAULT false,
  "companyId" varchar(255),
  "identifier" varchar(255) DEFAULT ''
);

CREATE TABLE "goals" (
  "id" varchar(255) PRIMARY KEY,
  "alias" varchar(255),
  "initialdate" timestamptz,
  "finaldate" timestamptz,
  "duration" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "goalnameId" varchar(255),
  "periodId" varchar(255),
  "total" float8 DEFAULT 0,
  "goaltypeId" varchar(255),
  "companyId" varchar(255),
  "createdbyId" varchar(255)
);

CREATE TABLE "goaltypes" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "groups" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "bg" varchar(255) DEFAULT '',
  "audit" bool DEFAULT false,
  "companyId" varchar(255),
  "primarycolor" varchar(255) DEFAULT '',
  "secondarycolor" varchar(255) DEFAULT '',
  "logo" varchar(255) DEFAULT '',
  "code" varchar(5) DEFAULT '',
  "topamount" int4 DEFAULT 0
);

CREATE TABLE "historicperiods" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "historics" (
  "id" varchar(255) PRIMARY KEY,
  "countprospectsinput" int4 DEFAULT 0,
  "countprospects" int4 DEFAULT 0,
  "countprospectsdiscarted" int4 DEFAULT 0,
  "countprospectsoportunities" int4 DEFAULT 0,
  "countclients" int4 DEFAULT 0,
  "countoportunities" int4 DEFAULT 0,
  "countoportunitiesdiscarted" int4 DEFAULT 0,
  "countsales" int4 DEFAULT 0,
  "amountoportunities" float8 DEFAULT 0,
  "amountsales" float8 DEFAULT 0,
  "amountuncollected" float8 DEFAULT 0,
  "amountcollected" float8 DEFAULT 0,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "historicperiodId" varchar(255),
  "yearId" varchar(255),
  "ejecutiveId" varchar(255)
);

CREATE TABLE "histories" (
  "id" varchar(255) PRIMARY KEY,
  "countprospects" jsonb DEFAULT '{}',
  "countoportunities" jsonb DEFAULT '{}',
  "countclients" jsonb DEFAULT '{}',
  "countsales" jsonb DEFAULT '{}',
  "amountoportunities" jsonb DEFAULT '{}',
  "amountsales" jsonb DEFAULT '{}',
  "year" int4 DEFAULT 2025,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "ejecutiveId" varchar(255),
  "groupId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "importants" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "system" bool DEFAULT false,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "importcharges" (
  "id" varchar(255) PRIMARY KEY,
  "currency" varchar(255) DEFAULT '',
  "price" float8 DEFAULT 0,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "conceptimportId" varchar(255),
  "orderId" varchar(255)
);

CREATE TABLE "installationproducts" (
  "id" varchar(255) PRIMARY KEY,
  "status" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "installationId" varchar(255),
  "warehouseproductId" varchar(255)
);

CREATE TABLE "installations" (
  "id" varchar(255) PRIMARY KEY,
  "folio" varchar(255),
  "assignmentdate" timestamptz,
  "installationdate" timestamptz,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "responsibleId" varchar(255),
  "createdbyId" varchar(255),
  "addressId" varchar(255)
);

CREATE TABLE "inventoryentries" (
  "id" varchar(255) PRIMARY KEY,
  "folio" varchar(255),
  "deliverydate" timestamptz,
  "observations" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "pickupId" varchar(255),
  "orderId" varchar(255),
  "providerId" varchar(255),
  "typesentriesId" varchar(255),
  "createdbyId" varchar(255),
  "warehouseId" varchar(255),
  "purchaseorderId" varchar(255)
);

CREATE TABLE "inventoryexits" (
  "id" varchar(255) PRIMARY KEY,
  "folio" varchar(255),
  "description" varchar(255),
  "status" varchar(255),
  "deliveryAt" timestamptz,
  "quatity" int,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "orderId" varchar(255),
  "createdbyId" varchar(255),
  "isfinish" bool,
  "warehouseorderId" varchar(255),
  "inroute" bool,
  "deliveryrouteId" varchar(255),
  "url" varchar(255),
  "typesexitId" varchar(255),
  "warehouseId" varchar(255)
);

CREATE TABLE "inventorytrackings" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "observations" text,
  "status" int,
  "url" text,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "warehouseproductId" varchar(255),
  "createdbyId" varchar(255)
);

CREATE TABLE "inventorytransferproducts" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "inventorytransferId" varchar(255),
  "warehouseproductId" varchar(255)
);

CREATE TABLE "inventorytransfers" (
  "id" varchar(255) PRIMARY KEY,
  "folio" varchar(255),
  "description" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "exitwarehouseId" varchar(255),
  "entrywarehouseId" varchar(255),
  "iscomplete" bool,
  "createdbyId" varchar(255),
  "warehouseexit" timestamptz,
  "warehouseentry" timestamptz
);

CREATE TABLE "labels" (
  "id" varchar(255) PRIMARY KEY,
  "label" varchar(255),
  "color" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255),
  "system" bool
);

CREATE TABLE "logs" (
  "id" varchar(255) PRIMARY KEY,
  "message" jsonb,
  "status" int4,
  "origin" text,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "error" bool,
  "ejecutiveId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "logslimenkas" (
  "id" varchar(255) PRIMARY KEY,
  "level" varchar(255),
  "source" varchar(255),
  "url_or_endpoint" varchar(255),
  "status_code" int4,
  "message" json,
  "request_payload" jsonb,
  "response_payload" jsonb,
  "error_code" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "createdbyId" varchar(255)
);

CREATE TABLE "notifications" (
  "id" varchar(255) PRIMARY KEY,
  "link" varchar(255),
  "message" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "toId" varchar(255),
  "fromId" varchar(255),
  "viewed" bool,
  "title" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "observationstemplates" (
  "id" varchar(255) PRIMARY KEY,
  "data" text,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "ejecutiveId" varchar(255),
  "createdbyId" varchar(255),
  "name" text,
  "color" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "oportunities" (
  "id" varchar(255) PRIMARY KEY,
  "amount" float8,
  "certainty" float8,
  "concept" varchar(255),
  "estimatedclossing" timestamptz,
  "comission" float8,
  "soldat" timestamptz,
  "iscloseout" bool,
  "quantity" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "prospectId" varchar(255),
  "phaseId" varchar(255),
  "discarted" bool,
  "deletedAt" timestamptz,
  "discartedreason" text,
  "discartedbyId" varchar(255),
  "reasonId" varchar(255),
  "ispaid" bool,
  "payments" int4,
  "quoteurl" text,
  "discount" float8,
  "compercentage" float8,
  "observations" text,
  "clossingreasonId" varchar(255),
  "generalobservations" text,
  "comissiontype" varchar(255),
  "paymentperiodicity" varchar(255),
  "noshippingtotal" float8,
  "soldbyId" varchar(255),
  "dispercentage" float8,
  "totalextracosts" float8,
  "subtotal" float8,
  "totaliva" float8,
  "extraproducts" jsonb[],
  "isorder" bool,
  "rejected" bool,
  "rejectedreason" varchar(255),
  "rejectId" varchar(255),
  "rejectbyId" varchar(255),
  "rejectedAt" timestamptz,
  "lastTracking" jsonb,
  "lastTrackingcreatedAt" timestamptz,
  "isimportant" bool,
  "importantreason" varchar(255),
  "importantbyId" varchar(255),
  "importantId" varchar(255),
  "importantAt" timestamptz,
  "typediscounts" int4,
  "totalTrackings" int4,
  "isdemo" bool,
  "isbid" bool,
  "deliveredincluded" bool,
  "customdelivered" bool,
  "deliverycost" float8,
  "nextpendingat" timestamptz,
  "typesalesId" varchar(255),
  "additionaldataId" varchar(255)
);

CREATE TABLE "additionaldataoportunities" (
  "id" varchar(255) PRIMARY KEY,
  "oportunitiesroutesId" varchar(255)
);

CREATE TABLE "oportunitiesroutes" (
  "id" varchar(255) PRIMARY KEY,
  "name" text,
  "createdbyId" varchar(255)
);

CREATE TABLE "oportunitiesroutesdestinations" (
  "id" varchar(255) PRIMARY KEY,
  "oportunitiesroutesId" varchar(255),
  "destination" varchar(255)
);

CREATE TABLE "orderdocs" (
  "id" varchar(255) PRIMARY KEY,
  "name" text,
  "url" text,
  "fileextension" text,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "orderId" varchar(255)
);

CREATE TABLE "orderreasons" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "orderrejects" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "system" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "orders" (
  "id" varchar(255) PRIMARY KEY,
  "receive" varchar(255),
  "phone" varchar(255),
  "total" float8,
  "observations" text,
  "billing" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "oportunityId" varchar(255),
  "companyId" varchar(255),
  "addressId" varchar(255),
  "folio" varchar(255),
  "billingAt" timestamptz,
  "approvedAt" timestamptz,
  "ready" bool,
  "discarted" bool,
  "discartedreason" text,
  "deletedAt" timestamptz,
  "orderstatusId" varchar(255),
  "orderreasonId" varchar(255),
  "isshipped" bool,
  "createdbyId" varchar(255),
  "url" text,
  "generalobservations" varchar(255),
  "paymentaccountId" varchar(255),
  "rejected" bool,
  "rejectedreason" varchar(255),
  "rejectbyId" varchar(255),
  "rejectedAt" timestamptz,
  "billId" varchar(255),
  "orderrejectId" varchar(255),
  "isverified" bool,
  "paymentwayId" varchar(255),
  "exitstatus" varchar(255),
  "locationlink" text,
  "delivered" bool,
  "canceled" bool,
  "cancellationreasonId" varchar(255),
  "isviewed" bool,
  "statuspooId" varchar(255),
  "isdemo" bool,
  "approvedbyId" varchar(255),
  "workstation" varchar(255),
  "additionalinformationId" varchar(255),
  "lastcommentAt" timestamptz
);

CREATE TABLE "authorizationsorders" (
  "id" varchar(255) PRIMARY KEY,
  "orderId" varchar(255),
  "requestby" varchar(255),
  "requestAt" timestamptz,
  "requestStatusAt" timestamptz,
  "requesttype" varchar(255) DEFAULT 'COMPRAS | LOGISTICA',
  "status" int4 DEFAULT 0
);

CREATE TABLE "orderstatuses" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "status" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "origins" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "parcels" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "paymentaccounts" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "paymentmethods" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "alias" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "paymentperiods" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "order" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "paymentspurchaseorders" (
  "id" varchar(255) PRIMARY KEY,
  "payment" float8 DEFAULT 0,
  "iva" float8 DEFAULT 0,
  "date" timestamptz,
  "observations" varchar(255) DEFAULT '0',
  "ispaid" bool DEFAULT false,
  "currency" varchar(255) DEFAULT 'MXN',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "createdbyId" varchar(255),
  "paidbyId" varchar(255),
  "purchaseorderId" varchar(255),
  "conceptimportId" varchar(255),
  "exchangerate" float8,
  "subtotal" float8
);

CREATE TABLE "paymentways" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "code" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "pendings" (
  "id" varchar(255) PRIMARY KEY,
  "notify_by" varchar(255),
  "remember_by" varchar(255),
  "notify" bool,
  "remember" bool,
  "description" text,
  "place" varchar(255),
  "subject" varchar(255),
  "date_from" timestamptz,
  "date_to" timestamptz,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "prospectId" varchar(255),
  "isdone" bool,
  "pendingstypeId" varchar(255),
  "status" int4,
  "createdbyId" varchar(255),
  "oportunityId" varchar(255),
  "orderId" varchar(255),
  "zone" varchar(255),
  "priority" int4,
  "ejecutiveId" varchar(255),
  "recurrent" bool,
  "postponedtime" timestamptz
);

CREATE TABLE "pendingsshoppings" (
  "id" varchar(255) PRIMARY KEY,
  "notify_by" varchar(255) NOT NULL,
  "remember_by" varchar(255) NOT NULL,
  "remember" bool DEFAULT false,
  "description" text DEFAULT '',
  "place" varchar(255) DEFAULT '',
  "subject" varchar(255) NOT NULL,
  "date_from" timestamptz NOT NULL,
  "date_to" timestamptz,
  "isdone" bool DEFAULT false,
  "status" int4 DEFAULT 1,
  "zone" varchar(255) NOT NULL,
  "priority" int4 DEFAULT 0,
  "recurrent" bool DEFAULT false,
  "postponedtime" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "purchaseorderId" varchar(255),
  "createdbyId" varchar(255),
  "ejecutiveId" varchar(255),
  "pendingstypeId" varchar(255)
);

CREATE TABLE "pendingstypes" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "periods" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "permissions" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "phases" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "objetive" varchar(255) NOT NULL,
  "color" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "order" int4 DEFAULT 0,
  "companyId" varchar(255),
  "system" bool DEFAULT false,
  "showto" int4 DEFAULT 0
);

CREATE TABLE "pickuppurchaseorders" (
  "id" varchar(255) PRIMARY KEY,
  "statuswho" varchar(255) DEFAULT '',
  "totaldelivered" int4 DEFAULT 0,
  "readytodelivery" bool,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "suppliesId" varchar(255),
  "pickupId" varchar(255),
  "statuspooId" varchar(255),
  "productoportunityId" varchar(255),
  "orderId" varchar(255),
  "purchaseorderId" varchar(255)
);

CREATE TABLE "pickups" (
  "id" varchar(255) PRIMARY KEY,
  "folio" varchar(255) DEFAULT '',
  "description" varchar(255) DEFAULT '',
  "status" varchar(255) DEFAULT '',
  "quantity" int4 DEFAULT 0,
  "pickupAt" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "createdbyId" varchar(255),
  "delivered" bool DEFAULT false,
  "url" varchar(255) DEFAULT '',
  "km_output" int4 DEFAULT 0,
  "km_arrival" int4 DEFAULT 0,
  "driverId" varchar(255),
  "transportunitId" varchar(255)
);

CREATE TABLE "postals" (
  "id" varchar(255) PRIMARY KEY,
  "postal_code" varchar(255) NOT NULL,
  "settlement" varchar(255) NOT NULL,
  "cityId" varchar(255),
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "productaccessories" (
  "id" varchar(255) PRIMARY KEY,
  "name" text,
  "type" varchar(255),
  "description" text,
  "physicalstock" int,
  "stock" int,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "productId" varchar(255)
);

CREATE TABLE "productphases" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "system" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "products" (
  "amount" float8,
  "brandId" varchar(255),
  "callamount" float8,
  "categoryId" varchar(255),
  "code" varchar(255),
  "companyId" varchar(255),
  "createdAt" timestamptz,
  "description" text,
  "height" float8,
  "id" varchar(255) PRIMARY KEY,
  "import" bool,
  "isactive" bool,
  "ispackage" bool,
  "length" float8,
  "name" text,
  "physicalstock" int,
  "producttypeId" varchar(255),
  "providerId" varchar(255),
  "stock" int,
  "stockapart" int,
  "stockassigned" int,
  "stockrepair" int,
  "stockintransit" int,
  "stocktotal" int,
  "storeamount" float8,
  "system" bool,
  "totaldollars" float8,
  "updatedAt" timestamptz,
  "warrantytimeId" varchar(255),
  "weight" float8,
  "width" float8
);

CREATE TABLE "productsbudgets" (
  "id" varchar(255) PRIMARY KEY,
  "quantity" int,
  "discount" float8,
  "dispercentage" float8,
  "iva" float8,
  "total" float8,
  "newprice" float8,
  "note" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "budgetId" varchar(255),
  "productId" varchar(255)
);

CREATE TABLE "productsoportunities" (
  "id" varchar(255) PRIMARY KEY,
  "quantity" int,
  "discount" float8,
  "dispercentage" float8,
  "iva" float8,
  "total" float8,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "oportunityId" varchar(255),
  "productId" varchar(255),
  "observations" text,
  "newprice" float8,
  "note" text,
  "shownote" bool,
  "companyId" varchar(255),
  "isshipped" bool,
  "deliverytimeId" varchar(255),
  "warehouseId" varchar(255),
  "totalorder" int,
  "isfullorder" bool,
  "isfullshopping" bool,
  "totalshopping" int,
  "deliverytimedone" timestamptz,
  "shoppingstatus" varchar(255),
  "statuspooId" varchar(255),
  "productpackageId" varchar(255),
  "delivered" bool,
  "trainingrequest" bool,
  "installationrequest" bool,
  "productreplaceId" varchar(255)
);

CREATE TABLE "productreplace" (
  "id" varchar(255) PRIMARY KEY,
  "approvedby" varchar(255),
  "approvedAt" timestamptz,
  "productId" varchar(255),
  "requestAt" timestamptz
);

CREATE TABLE "productsshippings" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "shippingId" varchar(255),
  "productoportunityId" varchar(255),
  "productphaseId" varchar(255),
  "deliveredAt" timestamptz,
  "estimatedDeliveryAt" timestamptz,
  "shippingphaseId" varchar(255)
);

CREATE TABLE "productstypes" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255),
  "system" bool
);

CREATE TABLE "prospects" (
  "id" varchar PRIMARY KEY,
  "name" varchar,
  "lastname" varchar,
  "email" varchar,
  "gender" varchar,
  "title" varchar,
  "url" varchar,
  "product" text,
  "phone" varchar,
  "optionalphone" varchar,
  "street" varchar,
  "isOportunity" bool,
  "job" varchar,
  "observations" text,
  "isClient" bool,
  "status" int,
  "remail" int,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "clientCompanyId" varchar,
  "ejecutiveId" varchar,
  "channelId" varchar,
  "postalId" varchar,
  "cityId" varchar,
  "clientTypeId" varchar,
  "entityId" varchar,
  "originId" varchar,
  "phaseId" varchar,
  "viewed" bool,
  "deletedAt" timestamptz,
  "discartedReason" text,
  "discartedById" varchar,
  "reasonId" varchar,
  "discarted" bool,
  "specialtyId" varchar,
  "facebook" varchar,
  "location" text,
  "applyDiscount" bool,
  "color" varchar,
  "clientAt" timestamptz,
  "createdById" varchar,
  "reasignedById" varchar,
  "categoryId" varchar,
  "lastTracking" jsonb,
  "lastTrackingCreatedAt" timestamptz,
  "totalSales" int,
  "fullName" varchar,
  "rejected" bool,
  "rejectedReason" varchar,
  "rejectId" varchar,
  "rejectById" varchar,
  "rejectedAt" timestamptz,
  "oportunityAt" timestamptz,
  "reassignedAt" timestamptz,
  "campaign" text,
  "totalTrackings" int,
  "isClientPotencial" bool,
  "bidder" bool,
  "nextPendingAt" timestamptz
);

CREATE TABLE "prospectslabels" (
  "id" varchar PRIMARY KEY,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "prospectId" varchar,
  "labelId" varchar,
  "labelName" varchar,
  "color" varchar,
  "system" bool
);

CREATE TABLE "provideraddresses" (
  "id" varchar PRIMARY KEY,
  "street" varchar,
  "ext_number" varchar,
  "int_number" varchar,
  "references" text,
  "settlement" varchar,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "providerId" varchar,
  "postalId" varchar,
  "cityId" varchar,
  "entityId" varchar,
  "companyId" varchar
);

CREATE TABLE "providers" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) DEFAULT '',
  "lastname" varchar(255) DEFAULT '',
  "email" varchar(255),
  "phone" varchar(255),
  "optionalphone" varchar(255) DEFAULT '',
  "rfc" varchar(255),
  "street" varchar(255),
  "identifier" varchar(255),
  "companyname" varchar(255) NOT NULL,
  "type" varchar(255),
  "nifcif" varchar(255),
  "observations" text DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255),
  "postalId" varchar(255),
  "cityId" varchar(255),
  "entityId" varchar(255),
  "system" bool DEFAULT false,
  "fullname" varchar(255) DEFAULT '',
  "national" bool DEFAULT false
);

CREATE TABLE "purchaseorders" (
  "id" varchar(255) PRIMARY KEY,
  "paymentcondition" varchar(255) DEFAULT '',
  "phone" varchar(255) DEFAULT '',
  "observations" varchar(255),
  "methoddelivery" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "providerId" varchar(255),
  "taxinformationId" varchar(255),
  "createdbyId" varchar(255),
  "companyId" varchar(255),
  "draft" bool DEFAULT false,
  "alias" varchar(255) DEFAULT '',
  "folio" varchar(255) DEFAULT '',
  "deliveryDate" timestamptz,
  "url" varchar(255) DEFAULT '',
  "national" bool DEFAULT false,
  "estimateddeliverydate" timestamptz,
  "delivered" bool DEFAULT false,
  "provideraddressId" varchar(255),
  "statuspooId" varchar(255),
  "quantity" int4 DEFAULT 0,
  "noguia" varchar(255) DEFAULT '',
  "deliverydatestimate" timestamptz,
  "sendAt" timestamptz,
  "amount" float8 DEFAULT 0
);

CREATE TABLE "purchasepayments" (
  "id" varchar(255) PRIMARY KEY,
  "payment" float8 DEFAULT 0,
  "date" timestamptz,
  "paidAt" timestamptz,
  "observations" text DEFAULT '',
  "ispaid" bool DEFAULT false,
  "paymentiva" float8 DEFAULT 0,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "conceptimport" varchar(255)
);

CREATE TABLE "reasons" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "companyId" varchar(255)
);

CREATE TABLE "reasonwarranties" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);

CREATE TABLE "refreshtokens" (
  "id" varchar(255) PRIMARY KEY,
  "refreshToken" text,
  "expiryDate" timestamptz,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ejecutiveId" varchar(255)
);

CREATE TABLE "rejects" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "system" bool DEFAULT false,
  "companyId" varchar(255)
);

CREATE TABLE "relatedcontacts" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "lastname" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "phone" varchar(255) NOT NULL,
  "optionalophone" varchar(255) DEFAULT '',
  "relation" varchar(255) NOT NULL,
  "observations" text DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "prospectId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "returns" (
  "id" varchar PRIMARY KEY,
  "quantity" int,
  "comment" varchar,
  "lastexitdate" timestamp,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdbyId" varchar,
  "warehouseId" varchar,
  "typereturnsId" varchar
);

CREATE TABLE "returnwarehousesproducts" (
  "id" varchar PRIMARY KEY,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "returnsId" varchar,
  "warehouseproductId" varchar,
  "lastinventoryexitId" varchar,
  "lastinventoryentryId" varchar
);

CREATE TABLE "salespayments" (
  "id" varchar PRIMARY KEY,
  "payment" float,
  "comission" float,
  "date" timestamp,
  "observations" text,
  "ispaid" boolean,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "oportunityId" varchar,
  "ejecutiveId" varchar,
  "paymentiva" float,
  "downpayment" boolean,
  "paymentperiodId" varchar,
  "paidAt" timestamp,
  "paidbyId" varchar,
  "paymentaccountId" varchar,
  "paymentwayId" varchar,
  "url" varchar
);

CREATE TABLE "shippingphases" (
  "id" varchar PRIMARY KEY,
  "name" varchar,
  "system" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar
);

CREATE TABLE "shippings" (
  "id" varchar PRIMARY KEY,
  "receive" varchar,
  "phone" varchar,
  "taken" bool,
  "delivered" bool,
  "deliveredAt" timestamptz,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "deletedAt" timestamptz,
  "orderId" varchar,
  "takenbyId" varchar,
  "addressId" varchar,
  "trackingnumber" varchar,
  "parcelId" varchar,
  "shippingtypeId" varchar,
  "shippingphaseId" varchar,
  "guidenumber" varchar
);

CREATE TABLE "shippingtypes" (
  "id" varchar PRIMARY KEY,
  "name" varchar,
  "system" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar
);

CREATE TABLE "socialmedias" (
  "id" varchar PRIMARY KEY,
  "facebook" varchar,
  "location" varchar,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "prospectId" varchar
);

CREATE TABLE "specialties" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255)
);

CREATE TABLE "statuspoos" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "color" varchar(255),
  "type" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "status" int,
  "bgcolor" varchar(255)
);

CREATE TABLE "suppliercontacts" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "lastname" varchar(255),
  "email" varchar(255),
  "phone" varchar(255),
  "optionalophone" varchar(255),
  "relation" varchar(255),
  "observations" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "providerId" varchar(255)
);

CREATE TABLE "supplies" (
  "id" varchar(255) PRIMARY KEY,
  "quantity" int,
  "unit" varchar(255),
  "unitprice" float8,
  "amount" float8,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "purchaseorderId" varchar(255),
  "productId" varchar(255),
  "totaldelivered" int,
  "alldelivered" bool,
  "productoportunityId" varchar(255),
  "statuspooId" varchar(255),
  "deliverytimedone" timestamptz
);

CREATE TABLE "supplieswarehouseproducts" (
  "id" varchar(255) PRIMARY KEY,
  "date" timestamptz,
  "iswarranty" bool DEFAULT false,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "warehouseproductId" varchar(255),
  "pickupId" varchar(255),
  "purchaseorderId" varchar(255),
  "suppliesId" varchar(255),
  "serialnumber" varchar(255)
);

CREATE TABLE "taxinformations" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "rfc" varchar(255),
  "phone" varchar(255),
  "email" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "contact" varchar(255),
  "addressId" varchar(255)
);

CREATE TABLE "taxregimes" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "code" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "templates" (
  "id" varchar(255) PRIMARY KEY,
  "description" varchar(255),
  "share" int4 DEFAULT 0,
  "type" varchar(255) DEFAULT 'whatsapp',
  "message" text DEFAULT '',
  "subject" varchar(255) DEFAULT '',
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "ejecutiveId" varchar(255),
  "groupId" varchar(255),
  "companyId" varchar(255),
  "createdbyId" varchar(255),
  "message_html" text DEFAULT ''
);

CREATE TABLE "templatesextracosts" (
  "id" varchar(255) PRIMARY KEY,
  "totalcost" float8 DEFAULT 0,
  "shipping" float8 DEFAULT 0,
  "installation" float8 DEFAULT 0,
  "training" float8 DEFAULT 0,
  "shippinginsurance" float8 DEFAULT 0,
  "exportcost" float8 DEFAULT 0,
  "ensurance" float8 DEFAULT 0,
  "extraweight" float8 DEFAULT 0,
  "extradimenssions" float8 DEFAULT 0,
  "extrapacking" float8 DEFAULT 0,
  "maintenance" float8 DEFAULT 0,
  "extra" float8 DEFAULT 0,
  "showtable" bool DEFAULT false,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "templatesoportunitiesId" varchar(255)
);

CREATE TABLE "templateshtmls" (
  "id" varchar(255) PRIMARY KEY,
  "description" varchar(255) DEFAULT '',
  "type" varchar(255) DEFAULT 'cotización',
  "html" text DEFAULT '',
  "groups" _varchar,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "companyId" varchar(255),
  "image" varchar(255) DEFAULT '',
  "name" varchar(255) DEFAULT '',
  "system" bool DEFAULT false
);

CREATE TABLE "templatesoportunities" (
  "id" varchar(255) PRIMARY KEY,
  "noshippingtotal" float8 DEFAULT 0,
  "totalextracosts" float8 DEFAULT 0,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "ejecutiveId" varchar(255),
  "createdbyId" varchar(255),
  "name" varchar(255),
  "description" text DEFAULT '',
  "observations" text DEFAULT ''
);

CREATE TABLE "templatesproductsoportunities" (
  "id" varchar(255) PRIMARY KEY,
  "quantity" int4,
  "discount" float8 DEFAULT 0,
  "dispercentage" float8 DEFAULT 0,
  "iva" float8 DEFAULT 0,
  "newprice" float8 DEFAULT 0,
  "total" float8 DEFAULT 0,
  "observations" text DEFAULT '',
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "templatesoportunitiesId" varchar(255)
);

CREATE TABLE "trackings" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "observations" text,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "prospectId" varchar(255),
  "phaseId" varchar(255),
  "actionId" varchar(255),
  "createdbyId" varchar(255),
  "certainty" float8,
  "status" int4,
  "oportunityId" varchar(255),
  "orderId" varchar(255),
  "url" text,
  "purchaseorderId" varchar(255),
  "type" int4
);

CREATE TABLE "trackingslogistics" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "observations" varchar(255),
  "status" int4,
  "url" varchar(255),
  "type" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "inventoryexitId" varchar(255),
  "inventoryentryId" varchar(255),
  "createdbyId" varchar(255)
);

CREATE TABLE "trackingsshoppings" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255) DEFAULT '',
  "observations" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "purchaseorderId" varchar(255),
  "createdbyId" varchar(255),
  "warrantywarehouseproductId" varchar(255)
);

CREATE TABLE "trainingproducts" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "productId" varchar(255),
  "trainingId" varchar(255),
  "workflowstatusesId" varchar(255),
  "warehouseproductId" varchar(255)
);

CREATE TABLE "trainings" (
  "id" varchar(255) PRIMARY KEY,
  "title" varchar(255),
  "folio" varchar(255),
  "assignmentdate" timestamptz,
  "trainingdate" timestamptz,
  "isvirtual" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "responsibleId" varchar(255),
  "createdbyId" varchar(255),
  "addressId" varchar(255),
  "workflowstatusesId" varchar(255)
);

CREATE TABLE "transportunits" (
  "id" varchar(255) PRIMARY KEY,
  "brand" varchar(255),
  "model" varchar(255),
  "mileage" int4,
  "tuition" varchar(255),
  "engine_number" varchar(255),
  "vehicle_series" varchar(255),
  "circulation_card" varchar(255),
  "insurance_policy" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "loading_permit" bool,
  "validity_loading_permit" timestamptz,
  "validity_insurance_policy" timestamptz,
  "insurance" varchar(255),
  "contractor" varchar(255),
  "color" varchar(255),
  "year" int4,
  "niv" varchar(255)
);

CREATE TABLE "typereturns" (
  "id" varchar(255) PRIMARY KEY,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "name" varchar(255)
);

CREATE TABLE "types_permissions" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "typesales" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "typesentries" (
  "id" varchar(255) PRIMARY KEY,
  "typesentry" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "typesexits" (
  "id" varchar(255) PRIMARY KEY,
  "typeexit" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "typewarehousesproducts" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "warehouseorders" (
  "id" varchar(255) PRIMARY KEY,
  "total" float8,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "orderId" varchar(255),
  "productId" varchar(255),
  "warehouseId" varchar(255),
  "totalorder" int4,
  "statuswho" varchar(255),
  "folio" varchar(255),
  "inroute" bool,
  "complete" bool,
  "delivered" bool,
  "isfullorder" bool,
  "isexitcreated" bool,
  "isinfloor" bool,
  "noguia" varchar(255)
);

CREATE TABLE "warehouseproductaccessories" (
  "id" varchar(255) PRIMARY KEY,
  "serialnumber" varchar(255),
  "available" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "productaccessoryId" varchar(255),
  "inventoryentryId" varchar(255),
  "status" varchar(255),
  "observations" varchar(255),
  "warehouseId" varchar(255)
);

CREATE TABLE "warehouseproducts" (
  "accessories" bool,
  "accessoriesobservations" varchar(255),
  "aestheticdetails" bool,
  "aestheticobservations" varchar(255),
  "apartbyId" varchar(255),
  "clean" bool,
  "cleanobservations" varchar(255),
  "comments" varchar(255),
  "createdAt" timestamptz,
  "delivered" bool,
  "guaranteeorder" varchar(255),
  "id" varchar(255) PRIMARY KEY,
  "inchargebyId" varchar(255),
  "indicator" varchar(255),
  "infloor" bool,
  "initialentry" timestamptz,
  "inprocess" bool,
  "inventoryentryId" varchar(255),
  "inventoryexitId" varchar(255),
  "isapart" bool,
  "isdemo" bool,
  "isstockassigned" bool,
  "istransfer" bool,
  "lastrevisiondate" timestamptz,
  "orderId" varchar(255),
  "productId" varchar(255),
  "purchaseorderId" varchar(255),
  "registrationdate" timestamptz,
  "repairobservations" varchar(255),
  "returnsId" varchar(255),
  "reviewed" bool,
  "reviewedAt" timestamptz,
  "reviewedbyId" varchar(255),
  "reviewedstartAt" timestamptz,
  "reviewformatURL" varchar(255),
  "serialnumber" varchar(255),
  "status" varchar(255),
  "statusrepair" bool,
  "typewarehouseproductId" varchar(255),
  "updatedAt" timestamptz,
  "warehouseId" varchar(255),
  "warehouseorderId" varchar(255),
  "intransit" bool,
  "transitat" timestamptz,
  "orderexitId" varchar(255)
);

CREATE TABLE "warehouseproductsreview" (
  "accessories" bool,
  "accessoriesobservations" varchar(255),
  "aestheticdetails" bool,
  "aestheticobservations" varchar(255),
  "clean" bool,
  "cleanobservations" varchar(255),
  "comments" varchar(255),
  "id" varchar(255) PRIMARY KEY,
  "inprocess" bool,
  "lastrevisiondate" timestamptz,
  "warehouseproductId" varchar(255),
  "registrationdate" timestamptz,
  "repairobservations" varchar(255),
  "reviewed" bool,
  "reviewedAt" timestamptz,
  "reviewedbyId" varchar(255),
  "reviewedstartAt" timestamptz,
  "reviewformatURL" varchar(255),
  "statusrepair" bool,
  "typewarehouseproductId" varchar(255)
);

CREATE TABLE "warehouses" (
  "id" varchar(255) PRIMARY KEY,
  "warehouse" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "name" varchar(255),
  "addressId" varchar(255),
  "companyId" varchar(255)
);

CREATE TABLE "warehousesstatuses" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) UNIQUE,
  "status" int4 UNIQUE,
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "warehousetrackings" (
  "id" varchar(255) PRIMARY KEY,
  "reason" varchar(255),
  "observations" text,
  "url" text,
  "type" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "warrantytimes" (
  "id" varchar(255) PRIMARY KEY,
  "warrantytime" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "warrantywarehouseproducts" (
  "id" varchar(255) PRIMARY KEY,
  "status" varchar(255) DEFAULT '',
  "warrantystartAt" timestamptz,
  "warrantyfinishAt" timestamptz,
  "warrantysendAt" timestamptz,
  "warrantyreceivedAt" timestamptz,
  "warrantyresolutionAt" timestamptz,
  "comments" varchar(255) DEFAULT '',
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "warehouseproductId" varchar(255),
  "purchaseorderId" varchar(255),
  "createdbyId" varchar(255),
  "reasonwarrantyId" varchar(255),
  "folio" varchar(255) DEFAULT ''
);

CREATE TABLE "whatsappSessions" (
  "id" varchar(255) PRIMARY KEY,
  "description" varchar(255),
  "ready" bool,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "ejecutiveId" varchar(255)
);

CREATE TABLE "workflowstatuses" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255),
  "area" varchar(255),
  "createdAt" timestamptz,
  "updatedAt" timestamptz
);

CREATE TABLE "years" (
  "id" varchar(255) PRIMARY KEY,
  "year" int4,
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "groupId" varchar(255)
);

ALTER TABLE "actions" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "activities" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "activities" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "activities" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "additionalinformations" ADD FOREIGN KEY ("approvedlogisticsbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("postalId") REFERENCES "postals" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "addresses" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "administrationgroups" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "administrationgroups" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "bidders" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("billedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("cfdiId") REFERENCES "cfdis" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("paymentmethodId") REFERENCES "paymentmethods" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("paymentwayId") REFERENCES "paymentways" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("taxregimeId") REFERENCES "taxregimes" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "biomedicalwarranties" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "biomedicalwarranties" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "brandlines" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "brands" ADD FOREIGN KEY ("brandlineId") REFERENCES "brandlines" ("id");

ALTER TABLE "budgets" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "budgets" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "budgets" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "budgets" ADD FOREIGN KEY ("assignedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "channels" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "cities" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "clientcompanies" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "clientcompanies" ADD FOREIGN KEY ("commercialbusinessId") REFERENCES "commercialbusinesses" ("id");

ALTER TABLE "clientcompanies" ADD FOREIGN KEY ("postalId") REFERENCES "postals" ("id");

ALTER TABLE "clientcompanies" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "clientcompanies" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "clienttypes" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "clossingreasons" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "commisions" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "commisions" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("postalId") REFERENCES "postals" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("commercialbusinessId") REFERENCES "commercialbusinesses" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "configs" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "deliveryroutes" ADD FOREIGN KEY ("driverId") REFERENCES "drivers" ("id");

ALTER TABLE "deliveryroutes" ADD FOREIGN KEY ("transportunitId") REFERENCES "transportunits" ("id");

ALTER TABLE "deliveryroutes" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "deliveryroutes" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "deliveryroutes" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "demosales" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "demosales" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "demosales" ADD FOREIGN KEY ("orderstatusId") REFERENCES "orderstatuses" ("id");

ALTER TABLE "distributorclients" ADD FOREIGN KEY ("distributorId") REFERENCES "distributors" ("id");

ALTER TABLE "distributorclients" ADD FOREIGN KEY ("buyerId") REFERENCES "buyers" ("id");

ALTER TABLE "distributorclients" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "distributorentities" ADD FOREIGN KEY ("distributorId") REFERENCES "distributors" ("id");

ALTER TABLE "distributorentities" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "distributors" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "distributors" ADD FOREIGN KEY ("commercialbusinessId") REFERENCES "commercialbusinesses" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("filestypeId") REFERENCES "filestypes" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("uploadbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "docs" ADD FOREIGN KEY ("budgetId") REFERENCES "budgets" ("id");

ALTER TABLE "drivers" ADD FOREIGN KEY ("ejecutivedriverId") REFERENCES "ejecutives" ("id");

ALTER TABLE "ejecutivediscounts" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "ejecutivediscounts" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "ejecutivediscounts" ADD FOREIGN KEY ("deniedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "ejecutivediscounts" ADD FOREIGN KEY ("approvedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "ejecutivediscounts" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "ejecutivegoals" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "ejecutivegoals" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "ejecutivegoals" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "ejecutivegoals" ADD FOREIGN KEY ("goalId") REFERENCES "goals" ("id");

ALTER TABLE "ejecutivegoals" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "ejecutivegoals" ADD FOREIGN KEY ("companyBelongsId") REFERENCES "companies" ("id");

ALTER TABLE "ejecutives" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "ejecutives" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "ejecutives" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "tokens" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "extracosts" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "extracosts" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "formats" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "formats" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "goalnames" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("goalnameId") REFERENCES "goalnames" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("periodId") REFERENCES "periods" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("goaltypeId") REFERENCES "goaltypes" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "goals" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "groups" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "historics" ADD FOREIGN KEY ("historicperiodId") REFERENCES "historicperiods" ("id");

ALTER TABLE "historics" ADD FOREIGN KEY ("yearId") REFERENCES "years" ("id");

ALTER TABLE "historics" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "histories" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "histories" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "histories" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "importants" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "importcharges" ADD FOREIGN KEY ("conceptimportId") REFERENCES "conceptimports" ("id");

ALTER TABLE "importcharges" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "installationproducts" ADD FOREIGN KEY ("installationId") REFERENCES "installations" ("id");

ALTER TABLE "installationproducts" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "installations" ADD FOREIGN KEY ("responsibleId") REFERENCES "ejecutives" ("id");

ALTER TABLE "installations" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "installations" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("pickupId") REFERENCES "pickups" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("providerId") REFERENCES "providers" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("typesentriesId") REFERENCES "typesentries" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "inventoryentries" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "inventoryexits" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "inventoryexits" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "inventoryexits" ADD FOREIGN KEY ("warehouseorderId") REFERENCES "warehouseorders" ("id");

ALTER TABLE "inventoryexits" ADD FOREIGN KEY ("deliveryrouteId") REFERENCES "deliveryroutes" ("id");

ALTER TABLE "inventoryexits" ADD FOREIGN KEY ("typesexitId") REFERENCES "typesexits" ("id");

ALTER TABLE "inventoryexits" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "inventorytrackings" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "inventorytrackings" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "inventorytransferproducts" ADD FOREIGN KEY ("inventorytransferId") REFERENCES "inventorytransfers" ("id");

ALTER TABLE "inventorytransferproducts" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "inventorytransfers" ADD FOREIGN KEY ("exitwarehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "inventorytransfers" ADD FOREIGN KEY ("entrywarehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "inventorytransfers" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "labels" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "logs" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "logs" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "logslimenkas" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("toId") REFERENCES "ejecutives" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("fromId") REFERENCES "ejecutives" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "observationstemplates" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "observationstemplates" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "observationstemplates" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("phaseId") REFERENCES "phases" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("discartedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("reasonId") REFERENCES "reasons" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("clossingreasonId") REFERENCES "clossingreasons" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("soldbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("rejectId") REFERENCES "rejects" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("rejectbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("importantbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("importantId") REFERENCES "importants" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("typesalesId") REFERENCES "typesales" ("id");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("additionaldataId") REFERENCES "additionaldataoportunities" ("id");

ALTER TABLE "additionaldataoportunities" ADD FOREIGN KEY ("oportunitiesroutesId") REFERENCES "oportunitiesroutes" ("id");

ALTER TABLE "oportunitiesroutes" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "oportunitiesroutesdestinations" ADD FOREIGN KEY ("oportunitiesroutesId") REFERENCES "oportunitiesroutes" ("id");

ALTER TABLE "oportunitiesroutesdestinations" ADD FOREIGN KEY ("destination") REFERENCES "entities" ("id");

ALTER TABLE "orderdocs" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "orderreasons" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "orderrejects" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("orderstatusId") REFERENCES "orderstatuses" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("orderreasonId") REFERENCES "orderreasons" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("paymentaccountId") REFERENCES "paymentaccounts" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("rejectbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("billId") REFERENCES "bills" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("orderrejectId") REFERENCES "orderrejects" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("paymentwayId") REFERENCES "paymentways" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("cancellationreasonId") REFERENCES "cancellationreasons" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("statuspooId") REFERENCES "statuspoos" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("approvedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("additionalinformationId") REFERENCES "additionalinformations" ("id");

ALTER TABLE "authorizationsorders" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "authorizationsorders" ADD FOREIGN KEY ("requestby") REFERENCES "ejecutives" ("id");

ALTER TABLE "origins" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "paymentaccounts" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "paymentspurchaseorders" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "paymentspurchaseorders" ADD FOREIGN KEY ("paidbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "paymentspurchaseorders" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "paymentspurchaseorders" ADD FOREIGN KEY ("conceptimportId") REFERENCES "conceptimports" ("id");

ALTER TABLE "pendings" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "pendings" ADD FOREIGN KEY ("pendingstypeId") REFERENCES "pendingstypes" ("id");

ALTER TABLE "pendings" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "pendings" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "pendings" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "pendings" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "pendingsshoppings" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "pendingsshoppings" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "pendingsshoppings" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "pendingsshoppings" ADD FOREIGN KEY ("pendingstypeId") REFERENCES "pendingstypes" ("id");

ALTER TABLE "phases" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "pickuppurchaseorders" ADD FOREIGN KEY ("suppliesId") REFERENCES "supplies" ("id");

ALTER TABLE "pickuppurchaseorders" ADD FOREIGN KEY ("pickupId") REFERENCES "pickups" ("id");

ALTER TABLE "pickuppurchaseorders" ADD FOREIGN KEY ("statuspooId") REFERENCES "statuspoos" ("id");

ALTER TABLE "pickuppurchaseorders" ADD FOREIGN KEY ("productoportunityId") REFERENCES "productsoportunities" ("id");

ALTER TABLE "pickuppurchaseorders" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "pickuppurchaseorders" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "pickups" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "pickups" ADD FOREIGN KEY ("driverId") REFERENCES "drivers" ("id");

ALTER TABLE "pickups" ADD FOREIGN KEY ("transportunitId") REFERENCES "transportunits" ("id");

ALTER TABLE "postals" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "productaccessories" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productphases" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("brandId") REFERENCES "brands" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("producttypeId") REFERENCES "productstypes" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("providerId") REFERENCES "providers" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("warrantytimeId") REFERENCES "warrantytimes" ("id");

ALTER TABLE "productsbudgets" ADD FOREIGN KEY ("budgetId") REFERENCES "budgets" ("id");

ALTER TABLE "productsbudgets" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("deliverytimeId") REFERENCES "deliverytimes" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("statuspooId") REFERENCES "statuspoos" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("productpackageId") REFERENCES "productsoportunities" ("id");

ALTER TABLE "productsoportunities" ADD FOREIGN KEY ("productreplaceId") REFERENCES "productreplace" ("id");

ALTER TABLE "productreplace" ADD FOREIGN KEY ("approvedby") REFERENCES "ejecutives" ("id");

ALTER TABLE "productreplace" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "productsshippings" ADD FOREIGN KEY ("shippingId") REFERENCES "shippings" ("id");

ALTER TABLE "productsshippings" ADD FOREIGN KEY ("productoportunityId") REFERENCES "productsoportunities" ("id");

ALTER TABLE "productsshippings" ADD FOREIGN KEY ("productphaseId") REFERENCES "productphases" ("id");

ALTER TABLE "productsshippings" ADD FOREIGN KEY ("shippingphaseId") REFERENCES "shippingphases" ("id");

ALTER TABLE "productstypes" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("clientCompanyId") REFERENCES "clientcompanies" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("channelId") REFERENCES "channels" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("postalId") REFERENCES "postals" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("clientTypeId") REFERENCES "clienttypes" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("originId") REFERENCES "origins" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("phaseId") REFERENCES "phases" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("discartedById") REFERENCES "ejecutives" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("reasonId") REFERENCES "reasons" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("specialtyId") REFERENCES "specialties" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("createdById") REFERENCES "ejecutives" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("reasignedById") REFERENCES "ejecutives" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("rejectId") REFERENCES "rejects" ("id");

ALTER TABLE "prospects" ADD FOREIGN KEY ("rejectById") REFERENCES "ejecutives" ("id");

ALTER TABLE "prospectslabels" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "prospectslabels" ADD FOREIGN KEY ("labelId") REFERENCES "labels" ("id");

ALTER TABLE "provideraddresses" ADD FOREIGN KEY ("providerId") REFERENCES "providers" ("id");

ALTER TABLE "provideraddresses" ADD FOREIGN KEY ("postalId") REFERENCES "postals" ("id");

ALTER TABLE "provideraddresses" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "provideraddresses" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "provideraddresses" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "providers" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "providers" ADD FOREIGN KEY ("postalId") REFERENCES "postals" ("id");

ALTER TABLE "providers" ADD FOREIGN KEY ("cityId") REFERENCES "cities" ("id");

ALTER TABLE "providers" ADD FOREIGN KEY ("entityId") REFERENCES "entities" ("id");

ALTER TABLE "purchaseorders" ADD FOREIGN KEY ("providerId") REFERENCES "providers" ("id");

ALTER TABLE "purchaseorders" ADD FOREIGN KEY ("taxinformationId") REFERENCES "taxinformations" ("id");

ALTER TABLE "purchaseorders" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "purchaseorders" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "purchaseorders" ADD FOREIGN KEY ("provideraddressId") REFERENCES "provideraddresses" ("id");

ALTER TABLE "purchaseorders" ADD FOREIGN KEY ("statuspooId") REFERENCES "statuspoos" ("id");

ALTER TABLE "purchasepayments" ADD FOREIGN KEY ("conceptimport") REFERENCES "conceptimports" ("id");

ALTER TABLE "reasons" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "refreshtokens" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "rejects" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "relatedcontacts" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "relatedcontacts" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "returns" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "returns" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "returns" ADD FOREIGN KEY ("typereturnsId") REFERENCES "typereturns" ("id");

ALTER TABLE "returnwarehousesproducts" ADD FOREIGN KEY ("returnsId") REFERENCES "returns" ("id");

ALTER TABLE "returnwarehousesproducts" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "returnwarehousesproducts" ADD FOREIGN KEY ("lastinventoryexitId") REFERENCES "inventoryexits" ("id");

ALTER TABLE "returnwarehousesproducts" ADD FOREIGN KEY ("lastinventoryentryId") REFERENCES "inventoryentries" ("id");

ALTER TABLE "salespayments" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "salespayments" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "salespayments" ADD FOREIGN KEY ("paymentperiodId") REFERENCES "paymentperiods" ("id");

ALTER TABLE "salespayments" ADD FOREIGN KEY ("paidbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "salespayments" ADD FOREIGN KEY ("paymentaccountId") REFERENCES "paymentaccounts" ("id");

ALTER TABLE "salespayments" ADD FOREIGN KEY ("paymentwayId") REFERENCES "paymentways" ("id");

ALTER TABLE "shippingphases" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "shippings" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "shippings" ADD FOREIGN KEY ("takenbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "shippings" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "shippings" ADD FOREIGN KEY ("parcelId") REFERENCES "parcels" ("id");

ALTER TABLE "shippings" ADD FOREIGN KEY ("shippingtypeId") REFERENCES "shippingtypes" ("id");

ALTER TABLE "shippings" ADD FOREIGN KEY ("shippingphaseId") REFERENCES "shippingphases" ("id");

ALTER TABLE "shippingtypes" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "socialmedias" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "specialties" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "suppliercontacts" ADD FOREIGN KEY ("providerId") REFERENCES "providers" ("id");

ALTER TABLE "supplies" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "supplies" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "supplies" ADD FOREIGN KEY ("productoportunityId") REFERENCES "productsoportunities" ("id");

ALTER TABLE "supplies" ADD FOREIGN KEY ("statuspooId") REFERENCES "statuspoos" ("id");

ALTER TABLE "supplieswarehouseproducts" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "supplieswarehouseproducts" ADD FOREIGN KEY ("pickupId") REFERENCES "pickups" ("id");

ALTER TABLE "supplieswarehouseproducts" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "supplieswarehouseproducts" ADD FOREIGN KEY ("suppliesId") REFERENCES "supplies" ("id");

ALTER TABLE "taxinformations" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "templates" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "templates" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "templates" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "templates" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "templatesextracosts" ADD FOREIGN KEY ("templatesoportunitiesId") REFERENCES "templatesoportunities" ("id");

ALTER TABLE "templateshtmls" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "templatesoportunities" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "templatesoportunities" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "templatesproductsoportunities" ADD FOREIGN KEY ("templatesoportunitiesId") REFERENCES "templatesoportunities" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("prospectId") REFERENCES "prospects" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("phaseId") REFERENCES "phases" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("actionId") REFERENCES "actions" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("oportunityId") REFERENCES "oportunities" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "trackings" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "trackingslogistics" ADD FOREIGN KEY ("inventoryexitId") REFERENCES "inventoryexits" ("id");

ALTER TABLE "trackingslogistics" ADD FOREIGN KEY ("inventoryentryId") REFERENCES "inventoryentries" ("id");

ALTER TABLE "trackingslogistics" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "trackingsshoppings" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "trackingsshoppings" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "trackingsshoppings" ADD FOREIGN KEY ("warrantywarehouseproductId") REFERENCES "warrantywarehouseproducts" ("id");

ALTER TABLE "trainingproducts" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "trainingproducts" ADD FOREIGN KEY ("trainingId") REFERENCES "trainings" ("id");

ALTER TABLE "trainingproducts" ADD FOREIGN KEY ("workflowstatusesId") REFERENCES "workflowstatuses" ("id");

ALTER TABLE "trainingproducts" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "trainings" ADD FOREIGN KEY ("responsibleId") REFERENCES "ejecutives" ("id");

ALTER TABLE "trainings" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "trainings" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "trainings" ADD FOREIGN KEY ("workflowstatusesId") REFERENCES "workflowstatuses" ("id");

ALTER TABLE "warehouseorders" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "warehouseorders" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "warehouseorders" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "warehouseproductaccessories" ADD FOREIGN KEY ("productaccessoryId") REFERENCES "productaccessories" ("id");

ALTER TABLE "warehouseproductaccessories" ADD FOREIGN KEY ("inventoryentryId") REFERENCES "inventoryentries" ("id");

ALTER TABLE "warehouseproductaccessories" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("apartbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("inchargebyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("inventoryentryId") REFERENCES "inventoryentries" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("inventoryexitId") REFERENCES "inventoryexits" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("returnsId") REFERENCES "returns" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("reviewedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("typewarehouseproductId") REFERENCES "typewarehousesproducts" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("warehouseorderId") REFERENCES "warehouseorders" ("id");

ALTER TABLE "warehouseproducts" ADD FOREIGN KEY ("orderexitId") REFERENCES "orders" ("id");

ALTER TABLE "warehouseproductsreview" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "warehouseproductsreview" ADD FOREIGN KEY ("reviewedbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "warehouseproductsreview" ADD FOREIGN KEY ("typewarehouseproductId") REFERENCES "typewarehousesproducts" ("id");

ALTER TABLE "warehouses" ADD FOREIGN KEY ("addressId") REFERENCES "addresses" ("id");

ALTER TABLE "warehouses" ADD FOREIGN KEY ("companyId") REFERENCES "companies" ("id");

ALTER TABLE "warrantywarehouseproducts" ADD FOREIGN KEY ("warehouseproductId") REFERENCES "warehouseproducts" ("id");

ALTER TABLE "warrantywarehouseproducts" ADD FOREIGN KEY ("purchaseorderId") REFERENCES "purchaseorders" ("id");

ALTER TABLE "warrantywarehouseproducts" ADD FOREIGN KEY ("createdbyId") REFERENCES "ejecutives" ("id");

ALTER TABLE "warrantywarehouseproducts" ADD FOREIGN KEY ("reasonwarrantyId") REFERENCES "reasonwarranties" ("id");

ALTER TABLE "whatsappSessions" ADD FOREIGN KEY ("ejecutiveId") REFERENCES "ejecutives" ("id");

ALTER TABLE "years" ADD FOREIGN KEY ("groupId") REFERENCES "groups" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("delivered") REFERENCES "orders" ("billing");

ALTER TABLE "oportunities" ADD FOREIGN KEY ("deletedAt") REFERENCES "oportunities" ("id");
