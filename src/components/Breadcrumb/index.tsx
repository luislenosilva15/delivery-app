import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

type BreadcrumbLinkType = {
  label: string;
  href?: string;
  isCurrent?: boolean;
};

interface Props {
  links: BreadcrumbLinkType[];
}

const Breadcrumb = ({ links }: Props) => {
  return (
    <ChakraBreadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      fontWeight="semibold"
      fontSize="sm"
      mb={4}
    >
      {links.map(({ label, href, isCurrent }, idx) => (
        <BreadcrumbItem key={idx} isCurrentPage={isCurrent}>
          {href && !isCurrent ? (
            <BreadcrumbLink href={href} _hover={{ color: "primary.500" }}>
              {label}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              as="span"
              color={isCurrent ? "primary.600" : "gray.600"}
              cursor={isCurrent ? "default" : "pointer"}
              fontWeight={isCurrent ? "bold" : "normal"}
            >
              {label}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;
